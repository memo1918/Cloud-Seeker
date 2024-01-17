import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import * as stream from "stream";
import { Stream } from "stream";
import fs, { PathLike } from "fs";
import { downloadDump } from "../../src/infracost/downloaddump";
import * as https from "https";
import path from "path";

jest.mock("fs");
jest.mock("https");

beforeEach(() => {
    jest.clearAllMocks();
});
describe("module for downloading arbitrary data from a url to the target file path", () => {
    test("that the contents of the url passed to the function are downloaded by the https module into the specified file", async () => {
        const actualFs = jest.requireActual<typeof import("fs")>("fs");

        let tmpFilePath = path.join("./tmp");
        const writeStream = actualFs.createWriteStream(tmpFilePath);

        (fs.createWriteStream as jest.Mock<any>).mockReturnValue(writeStream);
        //@ts-ignore
        (https.get as jest.Mock<any>).mockImplementation((url: string, cb: (response: stream) => void) => {
            let readStream = new Stream();

            cb(readStream);

            readStream.emit("data", "some");
            readStream.emit("data", "-");
            readStream.emit("data", "data");

            // readStream.emit("finish")
            readStream.emit("end"); // this will trigger the promise resolve

            return readStream;
        });

        const dummyUrl = "https://my.dummy.url";
        const dummyPath: PathLike = "./my.dummy.path/file.extention";

        await expect(downloadDump(dummyUrl, dummyPath)).resolves.toBe(undefined);

        expect(https.get).toBeCalledWith(dummyUrl, expect.anything());
        expect(fs.createWriteStream).toBeCalledWith(dummyPath);
        expect(actualFs.readFileSync(tmpFilePath).toString("utf-8")).toBe("some-data");

        actualFs.unlinkSync(tmpFilePath);
    });

    test("that if the reading throws an error the action is aborted", async () => {
        const actualFs = jest.requireActual<typeof import("fs")>("fs");

        let tmpFilePath = path.join("./tmp");
        let dummyError = new Error("this is a test error");
        const dummyUrl = "https://my.dummy.url";
        const dummyPath: PathLike = "./my.dummy.path/file.extention";

        // setup mocking
        const writeStream = actualFs.createWriteStream(tmpFilePath);
        (fs.createWriteStream as jest.Mock<any>).mockReturnValue(writeStream);

        (https.get as jest.Mock<any>).mockImplementation((url: string, cb: (response: stream) => void) => {
            let readStream = new Stream();

            cb(readStream);

            readStream.emit("data", "some");
            readStream.emit("data", "-");
            readStream.emit("data", "data");

            // readStream.emit("finish")
            setTimeout(() => readStream.emit("error", dummyError)); // this will trigger the error rejection

            return readStream;
        });

        await expect(downloadDump(dummyUrl, dummyPath)).rejects.toBe(dummyError);

        expect(fs.unlink).toBeCalled();
        try {
            actualFs.unlinkSync(tmpFilePath);
        } catch (e) {
            console.log(e);
        }
    });
});
