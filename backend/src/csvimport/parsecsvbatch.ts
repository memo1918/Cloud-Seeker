import fs from "fs";
import csv from "csv-parser";
import csvParser from "csv-parser";

export class ParseCsvBatch<T> {
    private filestream?: csvParser.CsvParser;
    private onResolve?: (data: [T[], boolean]) => void;
    private onReject?: (data: [T[], boolean]) => void;
    private data: T[] = [];
    private isComplete = false;

    constructor(private csvFilePath: string, private numberOfLines = 1000) {
        this.filestream = fs.createReadStream(this.csvFilePath).pause().pipe(csv());

        this.filestream.on("data", this.onNewLine.bind(this));

        this.filestream.on("end", () => {
            console.log(`CSV file reading complete.`);
            this.isComplete = true;
            this.publish();
        });

        this.filestream.on("error", (error: Error) => {
            console.log(`Error reading CSV file:`, error);
            this.error(error);
        });
    }

    private onNewLine(data: T) {

        this.data.push(data);
        if (this.data.length == this.numberOfLines) {
            this.filestream?.pause();
            this.publish();
        }
    }

    next(): Promise<[T[], boolean]> {
        if (this.onResolve || this.onReject) {
            throw new Error("another request is currently fulfilled");
        }
        if (this.isComplete) {
            throw new Error(`reading is already complete`);
        }
        return new Promise<[T[], boolean]>((resolve, reject) => {
            this.onResolve = resolve;
            this.onReject = reject;
            this.filestream?.resume();
        });
    }

    private publish() {
        if (!this.onReject || !this.onResolve) {
            return;
        }
        this.onResolve([this.data, this.isComplete]);
        this.data = [];
        this.onResolve = undefined;
        this.onReject = undefined;
    }

    private error(err: any) {
        if (!this.onReject || !this.onResolve) {
            return;
        }
        this.onResolve(err);
        this.onResolve = undefined;
        this.onReject = undefined;
    }
}
