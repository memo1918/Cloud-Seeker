import fs, { PathLike } from "fs";

export function removeFile(...files: PathLike[]) {
    console.log({ message: "removing file(s)", files, __filename });
    let promises = files.map(
        (file) =>
            new Promise<void>((resolve) => {
                fs.unlink(file, () => resolve); // Delete the file async. (But we don't check the result)
            })
    );
    Promise.all(promises).then(() => {
        console.log({ message: "Removal of files complete", files, __filename });
    });
    return Promise.resolve();
}
