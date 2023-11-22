export type CsvData = { [key: string]: string };

export interface CSVReader {
    readLine(): Promise<CsvData[]>;
}
