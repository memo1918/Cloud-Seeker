import fs from "fs";
import csv from "csv-parser";
import csvParser from "csv-parser";
import { CsvData, CSVReader } from "./CSVReader";

// this class is responsible for reading csv data
export class ReadCSV implements CSVReader {
    // this is the csv file stream
    private filestream?: csvParser.CsvParser;
    // this is the callback that is called when the next batch is ready
    private onResolve?: (data: CsvData[]) => void;
    // this is the callback that is called when an error occurs or the file is read completely
    private onReject?: (err: any) => void;
    // this is the data that is currently read and not yet returned
    private cache: CsvData[] = [];
    // this is a flag that indicates if the file is read completely
    private isCSVDone = false;

    constructor(
        private csvFilePath: string,
        private lineCount = 1
    ) {
        // create a read stream for the csv file
        this.filestream = fs.createReadStream(this.csvFilePath).pipe(
            csv({
                // this option is used to trim the header names as they might contain leading/tailing spaces
                mapHeaders: ({ header }) => header.trim()
            })
        );
        // listen for the data event and call the onNewLine method
        this.filestream.on("data", this.onNewLine.bind(this));

        // listen for the end event and set the isComplete flag
        this.filestream.on("close", (error: Error) => {
            if (this.onReject) {
                this.onReject(new Error("CSV file reading is complete."));
                console.log("CSV file reading is complete.");
            }
        });
        // listen for the end event and set the isComplete flag
        this.filestream.on("end", () => {
            this.isCSVDone = true;
            this.filestream?.destroy();
            // publish remaining data
            this.publish();
        });
        // listen for the error event and call the error method
        this.filestream.on("error", (error: Error) => {
            if (this.onReject) {
                this.onReject(new Error("Error reading the CSV file."));
                console.log("Error reading the CSV file.");
            }
        });
        // pause the file stream
        this.filestream.pause();
    }

    // this method is called when a new line is read
    private onNewLine(data: CsvData) {
        // add data to cache
        this.cache.push(data);
        if (this.cache.length == this.lineCount) {
            this.filestream?.pause();
            this.publish();
        }
    }

    // this method is called to resolve the promise with the next batch of data
    private publish() {
        if (this.onResolve) {
            this.onResolve(this.cache);
            this.cache = [];
            this.onResolve = undefined;
            this.onReject = undefined;
        }
    }

    // this method is called by the consumer to get the next batch of data
    public readLine(): Promise<CsvData[]> {
        // if a request is currently fulfilled, return a rejected promise
        if (this.onResolve || this.onReject) {
            return Promise.reject(new Error("another request is currently fulfilled."));
        }
        // if the file is read completely, return a rejected promise
        if (this.isCSVDone) {
            return Promise.reject(new Error("CSV reading is done."));
        }
        // if the file stream is paused, resume it and return a promise that resolves when the next batch is ready
        return new Promise<CsvData[]>((resolve, reject) => {
            this.onResolve = resolve;
            this.onReject = reject;
            this.filestream?.resume();
        });
    }
}
