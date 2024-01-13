import fs, { PathLike } from "fs";
import * as https from "https";
import * as http from "http";

/**
 * this function downloads a file from the internet and saves it to the targetFilePath
 * it returns a promise that resolves when the download is complete
 * it returns a promise that rejects when the download fails
 * it takes a dumpUrl and a targetFilePath as parameters
 * @param dumpUrl the url to download the file from
 * @param targetFilePath the path to save the file to
 * @returns {Promise<void>} a promise that resolves when the download is complete
 */
export function downloadDump(dumpUrl: string, targetFilePath: PathLike): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        // log the download
        console.log({
            message: "downloading dump to file. this might take a while go get some coffee",
            dumpUrl,
            targetFilePath,
            __filename
        });
        // create a filestream to write the dump to
        const file = fs.createWriteStream(targetFilePath);
        // check if the dumpUrl is https or http
        // this is done because the https module as different implementations
        // one for https and one for http the interface is the same
        let requestExecutorModule = dumpUrl.startsWith("https") ? https : http;
        // pipe the result of the request to the filestream
        requestExecutorModule
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
