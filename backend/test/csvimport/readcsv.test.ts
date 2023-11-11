import { describe, expect, test } from "@jest/globals";
import { ReadCSV } from "../../src/csvimport/readcsv";
import path from "path";

describe("readCSV", () => {
    const csvFilePath = path.join(__dirname, "testcsv.csv");

    test("should return correct data", async () => {
        const reader = new ReadCSV(csvFilePath);
        await expect(reader.readLine()).resolves.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    aws: "78d8fd3723016e85557930396667117b",
                    gcp: "31f7afe6f95e94e4f4c4a43d0c6e2742",
                    azure: "787251e13e4cbe2bc8e01883ea23dbf6"
                })
            ])
        );
    });

    test("should read CSV line by line", async () => {
        const reader = new ReadCSV(csvFilePath);
        await expect(reader.readLine()).resolves.toHaveLength(1);
    });

    test("should read CSV by specified batch", async () => {
        const reader = new ReadCSV(csvFilePath, 3);
        await expect(reader.readLine()).resolves.toHaveLength(3);
    });

    test("try to read line/batch while already reading", async () => {
        const reader = new ReadCSV(csvFilePath);
        await expect(Promise.all([reader.readLine(), reader.readLine()])).rejects.toMatchObject({
            message: "another request is currently fulfilled."
        });
    });

    test("test for CSV file reading is done.", async () => {
        const reader = new ReadCSV(csvFilePath, 25);
        await reader.readLine();
        await expect(reader.readLine()).rejects.toMatchObject({ message: "CSV reading is done." });
    });

    test("check if onEnd event is being handled correctly", async () => {
        const reader = new ReadCSV(csvFilePath, 50);
        await expect(reader.readLine()).resolves.toHaveLength(20);
    });
});
