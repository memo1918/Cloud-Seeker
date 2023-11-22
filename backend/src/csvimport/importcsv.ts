import fs from "fs";
import csv from "csv-parser";

export function countLinesInCSV(csvFilePath: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
        let lineCount = 0;
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on("data", () => {
                // Increment the line count for each row
                lineCount++;
            })
            .on("end", () => {
                // Resolve the promise with the line count
                resolve(lineCount);
            })
            .on("error", (error) => {
                // Reject the promise if an error occurs
                reject(error);
            });
    });
}
