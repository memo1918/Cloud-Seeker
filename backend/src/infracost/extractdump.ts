import fs, { PathLike } from "fs";
import * as zlib from "zlib";

/**
 * Extracts a dump file from an tar.gz archive
 * @param archiveFilePath The path to the archive file.
 * @param targetFilePath The path to the target file.
 * @returns A promise that resolves when the extraction is complete.
 */
export function extractDump(archiveFilePath: PathLike, targetFilePath: PathLike) {
    return new Promise<void>((resolve, reject) => {
        // log the extraction
        console.log({ message: "extracting dump file", archiveFilePath, targetFilePath, __filename });
        // create a filestream to read the archive from
        const archive = fs.createReadStream(archiveFilePath);
        // create a filestream to write the dump to
        const target = fs.createWriteStream(targetFilePath);
        // create a gunzip stream to decompress the archive
        const gunzip = zlib.createGunzip().on("error", (err) => {
            archive.close();
            target.close();
            console.error({ message: "error while extracting dump", archiveFilePath, targetFilePath, __filename, err });
            reject(err);
        });
        // pipe the archive to the gunzip stream and the gunzip stream to the target filestream
        archive.pipe(gunzip).pipe(target);
        // close the filestreams when the extraction is complete
        target.on("finish", () => {
            // log the extraction complete
            console.log({ message: "extracting dump file complete", archiveFilePath, targetFilePath, __filename });
            archive.close();
            target.close();
            // resolve the promise to indicate that the extraction is complete
            resolve();
        });
    });
}
