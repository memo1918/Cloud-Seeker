import fs, { PathLike } from "fs";
import * as zlib from "zlib";
import path from "path";
import * as https from "https";
import { ParseCsvBatch } from "../csvimport/parsecsvbatch";
import { execQuery } from "../db";
import { createServicesIndex, dropServices, insertServicesData } from "../db/models/services";
import axios from "axios";

export function getInfracostApiKey() {
    if (!process.env["INFRACOST_API_KEY"]) {
        console.error({ message: "INFRACOST_API_KEY environment variable is missing", env: process.env });
        throw new Error("INFRACOST_API_KEY environment variable is missing");
    }
    return process.env["INFRACOST_API_KEY"];
}

export async function getDumpUrl() {
    let infracost_api_key = getInfracostApiKey();

    console.log({ message: "fetching dump download url", infracost_api_key, __filename });

    const downloadUrlObject: { downloadUrl: string } = await axios.get(
        "https://pricing.api.infracost.io/data-download/latest",
        {
            headers: {
                "X-Api-Key": infracost_api_key
            }
        }
    );

    console.log({ message: "got url", downloadUrl: downloadUrlObject.downloadUrl, __filename });
    return downloadUrlObject.downloadUrl;
}

export function downloadDump(dumpUrl: string, targetFilePath: PathLike) {
    return new Promise<void>((resolve, reject) => {
        console.log({ message: "downloading dump to file", dumpUrl, targetFilePath, __filename });
        const file = fs.createWriteStream(targetFilePath);
        const request = https
            .get(dumpUrl, function (response) {
                response.pipe(file);
                // after download completed close filestream

                file.on("finish", () => {
                    console.log({ message: "download complete", dumpUrl, targetFilePath });
                    file.close();
                    resolve();
                });
            })
            .on("error", function (err) {
                // Handle errors
                console.error({ message: "download failed", err, dumpUrl, targetFilePath });
                fs.unlink(targetFilePath, () => undefined); // Delete the file async. (But we don't check the result)
                reject(err);
            });
    });
}

export function removeFile(...files: PathLike[]) {
    console.log({ message: "removing file(s)", files, __filename });
    let promises = files.map(
        (file) =>
            new Promise<void>((resolve) => {
                fs.unlink(file, () => resolve); // Delete the file async. (But we don't check the result)
            })
    );

    return Promise.all(promises);
}

export function extractDump(archiveFilePath: PathLike, targetFilePath: PathLike) {
    return new Promise<void>((resolve, reject) => {
        console.log({ message: "extracting dump file", archiveFilePath, targetFilePath, __filename });
        const archive = fs.createReadStream(archiveFilePath);
        const target = fs.createWriteStream(targetFilePath);
        const gunzip = zlib.createGunzip().on("error", (err) => {
            archive.close();
            target.close();
            console.error({ message: "error while extracting dump", archiveFilePath, targetFilePath, __filename, err });
            reject(err);
        });

        archive.pipe(gunzip).pipe(target);

        target.on("finish", () => {
            console.log({ message: "extracting dump file complete", archiveFilePath, targetFilePath, __filename });
            archive.close();
            target.close();
            resolve();
        });
    });
}

export interface CsvData {
    productHash: string;
    sku: string;
    vendorName: string;
    region: string;
    service: string;
    productFamily: string;
    attributes: string;
    prices: string;
}

export interface PriceInformation {
    USD: string;
    unit: string;
    priceHash: string;
    purchaseOption: string;
    startUsageAmount: string;
    effectiveDateStart: string;
}

export interface DumpData {
    productHash: string;
    sku: string;
    vendorName: string;
    region: string;
    service: string;
    productFamily: string;
    attributes: { [attributeName: string]: string };
    prices: PriceInformation[];
}

export async function loadInfracostDumpInDb() {
    let archiveFile: PathLike = path.join(process.cwd(), "archive.csv.gz");
    let extractionFile: PathLike = path.join(process.cwd(), "archive.csv");

    let dumpUrl = await getDumpUrl();
    await downloadDump(dumpUrl, archiveFile);
    await extractDump(archiveFile, extractionFile);
    await removeFile(archiveFile);

    let csvParser = new ParseCsvBatch<CsvData>(extractionFile, 10000);

    // recreate service collection and create index
    await execQuery<void>(async (client) => {
        await dropServices(client);
        await createServicesIndex(client);
    });

    // number of rows inserted
    let rows = 0;
    // errors during parsing
    let errors: { error: any; csvData: CsvData }[] = [];

    await execQuery<void>(async (client) => {
        let moreData = true;
        let i = 0;
        while (moreData) {
            // if (i == 10){  //delete this
            //     moreData = false;
            // }
            // i++;

            try {
                let [data, isComplete] = await csvParser.next();
                moreData = !isComplete;
                let dump: DumpData[] = data
                    .map((d) => {
                        try {
                            let attributes = JSON.parse(d.attributes);
                            let priceMap: { [hash: string]: [PriceInformation] } = JSON.parse(d.prices);

                            let prices = Object.values(priceMap).flat();

                            return { ...d, attributes, prices };
                        } catch (err) {
                            errors.push({ csvData: d, error: err });
                        }
                        return undefined as unknown as DumpData;
                    })
                    .filter((data) => data != undefined);
                rows += dump.length;
                await insertServicesData(client, dump);
            } catch (e) {
                console.error(e);
                break;
            }
        }
    });

    console.log({
        message: "insertion complete",
        rows,
        errors,
        __filename
    });

    if (errors.length > 0) console.error("errors", JSON.stringify(errors));

    // await removeFile(extractionFile);
    console.log({ message: "loading of infracost dump complete" });
}
