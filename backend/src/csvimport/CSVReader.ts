// this type is used to represent a single line of csv data, keys are the column names, values are the values
export type CsvData = { [key: string]: string };

// this interface is responsible for reading csv data
export interface CSVReader {
    // reads one or more lines of csv data
    readLine(): Promise<CsvData[]>;
}
