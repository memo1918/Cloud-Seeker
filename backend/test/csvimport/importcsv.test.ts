import { describe, expect, test } from "@jest/globals";
import { countLinesInCSV } from "../../src/csvimport/importcsv";
import path from "path";

describe("countLinesInCSV", () => {
    const csvFilePath = path.join(__dirname, "testcsv.csv");
    // Test for good case and correct path
    test("should return the correct line count for a CSV file.", async () => {
        const lineCount = await countLinesInCSV(csvFilePath);
        expect(lineCount).toEqual(20);
        // test same file for different line count
        expect(lineCount).not.toEqual(25);
    });

    // Test for bad case with different path
    test("should return the correct line count for a different CSV file.", async () => {
        const diffCSVFilePath = path.join(__dirname, "testdiffcsv.csv");
        const lineCount = await countLinesInCSV(diffCSVFilePath);
        expect(lineCount).toEqual(43);
        // test same file for different line count
        expect(lineCount).not.toEqual(21);
    });

});
