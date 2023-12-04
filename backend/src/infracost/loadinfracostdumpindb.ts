import { PathLike } from "fs";
import path from "path";
import { ParseCsvBatch } from "../csvimport/parsecsvbatch";
import { execQuery } from "../db";
import { createServicesIndex, dropServices, insertServicesData } from "../db/models/services";
import { CsvData } from "./interfaces/csvdata.interface";
import { PriceInformation } from "./interfaces/priceinformation.interface";
import { DumpData } from "./interfaces/dumpdata.interface";
import { getDumpUrl } from "./getdumpurl";
import { downloadDump } from "./downloaddump";
import { removeFile } from "./removefile";
import { extractDump } from "./extractdump";
import { shouldimportdump } from "./shouldimportdump";
import { countlines } from "./countlines";

export async function loadinfracostdumpindb() {
    if (!(await shouldimportdump())) {
        return;
    }

    let archiveFile: PathLike = path.join(process.cwd(), "archive.csv.gz");
    let extractionFile: PathLike = path.join(process.cwd(), "archive.csv");

    let dumpUrl = await getDumpUrl();
    await downloadDump(dumpUrl, archiveFile);
    await extractDump(archiveFile, extractionFile);
    await removeFile(archiveFile);

    let numberOfRows = await countlines(extractionFile);

    let csvParser = new ParseCsvBatch<CsvData>(extractionFile, 1000);

    // recreate service collection and create index
    await execQuery<void>(async (client) => {
        await dropServices(client);
        await createServicesIndex(client);
    });

    console.log({ message: `inserting ${numberOfRows} entries into the database` });

    // number of rows inserted
    let rows = 0;
    // errors during parsing
    let errors: { error: any; csvData: CsvData }[] = [];

    let moreData = true;
    while (moreData) {
        try {
            // console.log({ message: "getting csv data", __filename });
            let [data, isComplete] = await csvParser.next();
            moreData = !isComplete;
            // console.log({ message: "got csv data", moreData, __filename });
            let dump: DumpData[] = data
                .map((d) => {
                    try {
                        d.attributes = JSON.parse(d.attributes);
                        let priceMap: { [hash: string]: [PriceInformation] } = JSON.parse(d.prices);

                        d.prices = Object.values(priceMap).flat() as any;

                        return d as any as DumpData;
                    } catch (err) {
                        errors.push({ csvData: d, error: err });
                    }
                    return undefined as unknown as DumpData;
                })
                .filter((data) => data != undefined);
            // console.log({ message: "parsed csv data ... inserting into db" });
            await execQuery<void>(async (client) => {
                await insertServicesData(client, dump);
            }, 1000);
            rows += dump.length;
            console.log({ message: `inserted ${rows} of ${numberOfRows} rows` });
        } catch (e) {
            console.log({ message: "error occurred while inserting into db." });
            console.error(e);
            break;
        }
    }

    console.log({
        message: "insertion complete",
        rows,
        errors,
        __filename
    });

    if (errors.length > 0) console.error("errors", JSON.stringify(errors));

    await removeFile(extractionFile);
    console.log({ message: "loading of infracost dump complete" });
}
