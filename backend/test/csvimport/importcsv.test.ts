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

    test("should handle errors and reject the promise if the file does not exist", async () => {
        // provide non existent csv file path
        const nonExFilePath = "./src/nonexistent-testcsv.csv";
        const fnCal = countLinesInCSV(nonExFilePath);
        // Try to call the function and handle reject
        await expect(fnCal).rejects.toMatchObject({
            message: expect.stringContaining("ENOENT"),
            code: "ENOENT"
        });
    });
});
