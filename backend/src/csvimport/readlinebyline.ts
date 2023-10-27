import fs from "fs";
import csv from "csv-parser";
import csvParser from "csv-parser";

export class ReadCSV {
    private filestream?: csvParser.CsvParser;
    private onResolve?: (data: any) => void;
    private onReject?: (data: any) => void;

    constructor(private csvFilePath: string) {
        this.filestream = fs.createReadStream(this.csvFilePath).pipe(csv());
        this.filestream.pause();
        this.filestream.on("data", this.onNewLine.bind(this));
        this.filestream.on("close", () => {
            console.log(`CSV file reading complete.`);
        });

        this.filestream.on("error", (error: Error) => {
            console.log(`Error reading CSV file:`, error);
        });
    }

    onNewLine(line: any) {
        this.filestream?.pause();
        //@ts-ignore
        this.onResolve(line);
    }

    readLine(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.onResolve = resolve;
            this.onReject = reject;
            this.filestream?.resume();
        });
    }
}
