import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, jest, test } from "@jest/globals";
import fs, { PathLike } from "fs";
import path from "path";
import * as zlib from "zlib";
import { extractDump } from "../../src/infracost/extractdump";

beforeEach(() => {
    jest.clearAllMocks();
});
describe("behaviour of extracting the data from the archive", () => {
    let gunzipFile: PathLike = path.join("tmp.archive.txt.gz");
    let extractionFile: PathLike = path.join("tmp.archive.txt");
    let invalidFile: PathLike = path.join("invalid.archive.txt.gz");
    const testFileContents = "test file contents";

    beforeAll(async () => {
        // create dummy temporary gunzip file
        const gz = zlib.createGzip();
        gz.pipe(fs.createWriteStream(gunzipFile));
        gz.write(testFileContents, "utf-8");
        await new Promise<void>((resolve) => gz.end(resolve));

        // create invaild file
        fs.writeFileSync(invalidFile, testFileContents);
    });

    afterAll(() => {
        // delete dummy temporary gunzip files
        fs.unlinkSync(gunzipFile);
        fs.unlinkSync(invalidFile);
    });

    afterEach(() => {
        // delete dummy temporary files
        fs.unlinkSync(extractionFile);
    });

    test("that the archive is extracted correctly", async () => {
        await expect(extractDump(gunzipFile, extractionFile)).resolves.toBe(undefined);

        expect(fs.readFileSync(extractionFile).toString("utf-8")).toBe(testFileContents);
    });

    test("that the archive throws on invalid file format", async () => {
        await expect(extractDump(invalidFile, extractionFile)).rejects.toMatchObject({
            code: "Z_DATA_ERROR"
        });
    });
});
