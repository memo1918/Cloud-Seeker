import fs from "fs";
import csv from "csv-parser";

// this method counts the number of lines in a csv file and returns a promise with the line count
export function countLinesInCSV(csvFilePath: string): Promise<number> {
    // ceate a promise that resolves with the line count
    return new Promise<number>((resolve, reject) => {
        // create a line count variable
        let lineCount = 0;
        // create a read stream for the csv file
        fs.createReadStream(csvFilePath)
            // pipe the read stream to the csv parser
            .pipe(csv())
            // listen for the data event and increment the line count
            .on("data", () => {
                // Increment the line count for each row
                lineCount++;
            })
            // listen for the end event and resolve the promise
            .on("end", () => {
                // Resolve the promise with the line count
                resolve(lineCount);
            })
            // listen for the error event and reject the promise
            .on("error", (error) => {
                // Reject the promise if an error occurs
                reject(error);
            });
    });
}
