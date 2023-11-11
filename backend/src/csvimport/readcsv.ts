import fs from "fs";
import csv from "csv-parser";
import csvParser from "csv-parser";

export type CsvData = { [key: string]: string };

export class ReadCSV {
    private filestream?: csvParser.CsvParser;
    private onResolve?: (data: CsvData[]) => void;
    private onReject?: (err: any) => void;
    private cache: CsvData[] = [];
    private isCSVDone = false;

    constructor(
        private csvFilePath: string,
        private lineCount = 1
    ) {
        this.filestream = fs.createReadStream(this.csvFilePath).pipe(
            csv({
                mapHeaders: ({ header }) => header.trim()
            })
        );

        this.filestream.on("data", this.onNewLine.bind(this));

        this.filestream.on("close", (error: Error) => {
            if (this.onReject) {
                this.onReject(new Error("CSV file reading is complete."));
            }
        });

        this.filestream.on("end", () => {
            this.isCSVDone = true;
            this.filestream?.destroy();
            this.publish();
        });

        this.filestream.on("error", (error: Error) => {
            if (this.onReject) {
                this.onReject(new Error("Error reading the CSV file."));
            }
        });
        this.filestream.pause();
    }

    onNewLine(data: CsvData) {
        // add data to cache
        this.cache.push(data);
        if (this.cache.length == this.lineCount) {
            this.filestream?.pause();
            this.publish();
        }
    }

    private publish() {
        if (this.onResolve) {
            this.onResolve(this.cache);
            this.cache = [];
            this.onResolve = undefined;
            this.onReject = undefined;
        }
    }

    readLine(): Promise<CsvData[]> {
        if (this.onResolve || this.onReject) {
            return Promise.reject(new Error("another request is currently fulfilled."));
        }
        if (this.isCSVDone) {
            return Promise.reject(new Error("CSV reading is done."));
        }
        return new Promise<CsvData[]>((resolve, reject) => {
            this.onResolve = resolve;
            this.onReject = reject;
            this.filestream?.resume();
        });
    }
}
