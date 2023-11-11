import fs, { PathLike } from "fs";
import * as zlib from "zlib";

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
