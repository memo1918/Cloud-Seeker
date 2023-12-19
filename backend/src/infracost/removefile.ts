import fs, { PathLike } from "fs";

// this function removes a file from the filesystem
// it returns a promise that resolves when the removal is complete
export function removeFile(...files: PathLike[]) {
    console.log({ message: "removing file(s)", files, __filename });
    let promises = files.map(
        (file) =>
            // create a promise that resolves when the file is removed
            new Promise<void>((resolve) => {
                fs.unlink(file, () => resolve); // Delete the file async. (But we don't check the result)
            })
    );
    // wait for all the promises to resolve before resolving the promise returned by this function
    Promise.all(promises).then(() => {
        console.log({ message: "Removal of files complete", files, __filename });
    });
    return Promise.resolve();
}
