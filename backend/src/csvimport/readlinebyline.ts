import fs from "fs";
import csv from "csv-parser";
import csvParser from "csv-parser";
import { CsvData, CSVReader } from "./CSVReader";

export class ReadCSV implements CSVReader {
    private filestream?: csvParser.CsvParser;
    private onResolve?: (data: CsvData) => void;
    private onReject?: (err: any) => void;
    private isCSVDone = false;

    constructor(private csvFilePath: string) {
        this.filestream = fs.createReadStream(this.csvFilePath).pipe(
            csv({
                mapHeaders: ({ header }) => header.trim()
            })
        );

        this.filestream.on("data", this.onNewLine.bind(this));

        this.filestream.on("close", (error: Error) => {
            if (this.onReject) {
                this.onReject(new Error("CSV file reading is complete."));
                console.log("CSV file reading is complete.");
            }
        });
        this.filestream.on("end", () => {
            this.isCSVDone = true;
        });

        this.filestream.on("error", (error: Error) => {
            if (this.onReject) {
                this.onReject(new Error("Error reading the CSV file."));
                console.log("Error reading the CSV file.");
            }
        });
        this.filestream.pause();
    }

    private onNewLine(data: CsvData) {
        this.filestream?.pause();
        if (this.onResolve) {
            this.onResolve(data);
            this.onResolve = undefined;
            this.onReject = undefined;
        }
    }

    public readLine(): Promise<CsvData> {
        if (this.onResolve || this.onReject) {
            throw new Error("another request is currently fulfilled.");
        }
        if (this.isCSVDone) {
            throw new Error("CSV reading is done.");
        }
        return new Promise<CsvData>((resolve, reject) => {
            this.onResolve = resolve;
            this.onReject = reject;
            this.filestream?.resume();
        });
    }
}
