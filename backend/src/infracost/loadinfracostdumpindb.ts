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

// Purpose: Load infracost dump in db.
// this function loads the infracost dump into the database
// it downloads the dump from the infracost website
// it extracts the dump from the archive
// it parses the csv data
// it inserts the parsed data into the database
// it removes the dump file after it is done
// it returns a promise that resolves when the loading is complete
export async function loadinfracostdumpindb() {
    // check if the dump should be imported
    if (!(await shouldimportdump())) {
        return;
    }
    // create the paths to the archive and the extracted dump
    let archiveFile: PathLike = path.join(process.cwd(), "archive.csv.gz");
    let extractionFile: PathLike = path.join(process.cwd(), "archive.csv");

    // get the dump url
    let dumpUrl = await getDumpUrl();
    // download the dump
    await downloadDump(dumpUrl, archiveFile);
    // extract the dump
    await extractDump(archiveFile, extractionFile);
    // remove the archive
    await removeFile(archiveFile);
    // count the number of rows in the dump used for logging
    let numberOfRows = await countlines(extractionFile);
    // create a csv parser to parse the dump and set the batch size to 1000
    let csvParser = new ParseCsvBatch<CsvData>(extractionFile, 1000);

    // recreate service collection and create index
    await execQuery<void>(async (client) => {
        // drop the services collection
        await dropServices(client);
        // create the services collection and the index
        await createServicesIndex(client);
    });
    // log the number of rows that will be inserted into the database
    console.log({ message: `inserting ${numberOfRows} entries into the database` });

    // number of rows inserted
    let rows = 0;
    // errors during parsing
    let errors: { error: any; csvData: CsvData }[] = [];
    // insert the data into the database
    let moreData = true;
    while (moreData) {
        try {
            // parse the next batch of data
            let [data, isComplete] = await csvParser.next();
            moreData = !isComplete;
            // parse the data
            let dump: DumpData[] = data
                // parse the attributes and prices
                .map((d) => {
                    try {
                        // parse the attributes and prices
                        d.attributes = JSON.parse(d.attributes);
                        let priceMap: { [hash: string]: [PriceInformation] } = JSON.parse(d.prices);
                        // transform the price map into an array
                        d.prices = Object.values(priceMap).flat() as any;

                        return d as any as DumpData;
                    } catch (err) {
                        errors.push({ csvData: d, error: err });
                    }
                    return undefined as unknown as DumpData;
                })
                // remove invalid data
                .filter((data) => data != undefined);
            // console.log({ message: "parsed csv data ... inserting into db" });
            // insert the data into the database
            await execQuery<void>(async (client) => {
                await insertServicesData(client, dump);
            }, 1000);
            // log the number of rows inserted as a status update
            // this might take a while so get some coffee
            rows += dump.length;
            console.log({ message: `inserted ${rows} of ${numberOfRows} rows` });
        } catch (e) {
            console.log({ message: "error occurred while inserting into db." });
            console.error(e);
            break;
        }
    }
    // log the number of rows inserted and the errors that occurred
    console.log({
        message: "insertion complete",
        rows,
        errors,
        __filename
    });
    // log the errors that occurred
    if (errors.length > 0) console.error("errors", JSON.stringify(errors));
    // remove the dump file
    await removeFile(extractionFile);
    // log that the loading of the dump is complete
    console.log({ message: "loading of infracost dump complete" });
}
