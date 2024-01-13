import fs from "fs";
import csv from "csv-parser";
import csvParser from "csv-parser";

/**
 * this class is responsible for reading a csv file in batches
 *
 * @template T the type of the data in the csv file
 */
export class ParseCsvBatch<T> {
    /**
     * this is the csv file stream
     * @private
     */
    private filestream?: csvParser.CsvParser;
    /**
     * this is the callback that is called when the next batch is ready
     * @private
     */
    private onResolve?: (data: [T[], boolean]) => void;
    /**
     * this is the callback that is called when an error occurs or the file is read completely
     * @private
     */
    private onReject?: (data: [T[], boolean]) => void;
    /**
     * this is the data that is currently read and not yet returned
     * @private
     */
    private data: T[] = [];
    /**
     * this is a flag that indicates if the file is read completely
     * @private
     */
    private isComplete = false;

    /**
     * creates a new instance of the class
     * @param csvFilePath the path to the csv file
     * @param numberOfLines the number of lines to read in one batch
     */
    constructor(
        private csvFilePath: string,
        private numberOfLines = 1000
    ) {
        // create a read stream for the csv file
        this.filestream = fs.createReadStream(this.csvFilePath).pause().pipe(csv());

        // listen for the data event and call the onNewLine method
        this.filestream.on("data", this.onNewLine.bind(this));

        // listen for the end event and set the isComplete flag
        this.filestream.on("end", () => {
            console.log(`CSV file reading complete.`);
            this.isComplete = true;
            this.publish();
        });

        // listen for the error event and call the error method
        this.filestream.on("error", (error: Error) => {
            console.log(`Error reading CSV file:`, error);
            this.error(error);
        });
    }

    /**
     * this method is called when a new line is read
     * @param data the data that was read
     * @private
     */
    private onNewLine(data: T) {
        // add the data to the data array
        this.data.push(data);
        // if the data array has the specified number of lines, pause the file stream and publish the data
        if (this.data.length == this.numberOfLines) {
            this.filestream?.pause();
            this.publish();
        }
    }

    /**
     * this method returns the next batch of data
     *
     * @returns {Promise<[T[], boolean]>} the next batch of data and a flag that indicates if the file is read completely
     * @throws {Error} if a request is currently fulfilled or the file is read completely
     */
    next(): Promise<[T[], boolean]> {
        // if a request is currently fulfilled, throw an error
        if (this.onResolve || this.onReject) {
            throw new Error("another request is currently fulfilled");
        }
        // if the file is read completely, throw an error
        if (this.isComplete) {
            throw new Error(`reading is already complete`);
        }
        // if the file stream is paused, resume it and return a promise that resolves when the next batch is ready
        return new Promise<[T[], boolean]>((resolve, reject) => {
            this.onResolve = resolve;
            this.onReject = reject;
            this.filestream?.resume();
        });
    }

    /**
     * this method publishes the data that is currently read
     * @private
     */
    private publish() {
        // if no callbacks are set ignore the publish event
        if (!this.onReject || !this.onResolve) {
            console.warn(`no callbacks set`);
            return;
        }
        // call the onResolve callback with the data and the isComplete flag
        this.onResolve([this.data, this.isComplete]);
        // reset the data and the callbacks
        this.data = [];
        this.onResolve = undefined;
        this.onReject = undefined;
    }

    /**
     * this method is called when an error occurs
     * @param err the error that occurred
     * @private
     */
    private error(err: any) {
        // if no callbacks are set ignore the error event
        if (!this.onReject || !this.onResolve) {
            console.error(`no callbacks set`, err);
            return;
        }
        // call the onReject callback with the error
        this.onReject(err);
        this.onResolve = undefined;
        this.onReject = undefined;
    }
}
