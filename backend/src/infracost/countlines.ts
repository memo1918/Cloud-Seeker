import fs from "fs";

export async function countlines(filePath: string) {
    // function copied from http://stackoverflow.com/questions/12453057/node-js-count-the-number-of-lines-in-a-file
    // with very few modifications
    return new Promise<number>((resolve, reject) => {
        let i;
        let count = 0;
        fs.createReadStream(filePath)
            .on("error", reject)
            .on("data", (chunk) => {
                for (i = 0; i < chunk.length; ++i) if (chunk[i] == 10) count++;
            })
            .on("end", () => resolve(count));
    });
}
