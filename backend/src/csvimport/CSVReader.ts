/**
 * this type is used to represent a single line of csv data, keys are the column names, values are the values
 */
export type CsvData = {
    /**
     * the key of the column and the value of the column
     */
    [key: string]: string;
};

/**
 * this interface is responsible for reading csv data
 */
export interface CSVReader {
    /**
     * reads one or more lines of csv data
     *
     * @returns {Promise<CsvData[]>} the csv data one or more lines
     */
    readLine(): Promise<CsvData[]>;
}
