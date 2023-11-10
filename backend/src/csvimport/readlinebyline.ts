import fs from "fs";
import csv from "csv-parser";
import csvParser from "csv-parser";

export class ReadCSV {
    private filestream?: csvParser.CsvParser;
    private onResolve?: (data: any) => void;
    private onReject?: (data: any) => void;

    constructor(private csvFilePath: string) {
        this.filestream = fs.createReadStream(this.csvFilePath).pause().pipe(csv());
        this.filestream.on("data", this.onNewLine.bind(this));
        this.filestream.on("close", () => {
            console.log(`CSV file reading complete.`);
        });

        this.filestream.on("error", (error: Error) => {
            console.log(`Error reading CSV file:`, error);
        });
    }

    onNewLine(data: { [key: string]: string }) {
        this.filestream?.pause();
        let key = Object.keys(data)[0];
        let value = data[key];
        if (this.onResolve) {
            this.onResolve(value.split(";"));
            this.onResolve = undefined;
            this.onReject = undefined;
        }
    }

    readLine(): Promise<string[]> {
        if (this.onResolve || this.onReject) {
            throw new Error("another request is currently fulfilled");
        }
        return new Promise<string[]>((resolve, reject) => {
            this.onResolve = resolve;
            this.onReject = reject;
            this.filestream?.resume();
        });
    }
}
