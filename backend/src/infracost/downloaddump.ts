import fs, { PathLike } from "fs";
import * as https from "https";

export function downloadDump(dumpUrl: string, targetFilePath: PathLike) {
    return new Promise<void>((resolve, reject) => {
        console.log({
            message: "downloading dump to file. this might take a while go get some coffee",
            dumpUrl,
            targetFilePath,
            __filename
        });
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
