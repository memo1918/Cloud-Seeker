import { MongoMemoryServer } from "mongodb-memory-server";
import { beforeAll, beforeEach, describe, expect, jest, test } from "@jest/globals";
import { execQuery } from "../../src/db";
import { createServicesIndex, dropServices, insertServicesData } from "../../src/db/models/services";
import { csvTestDbFixtureData, transformedTestDbFixtureData } from "./csvTestDbFixtureData";
import { loadinfracostdumpindb } from "../../src/infracost/loadinfracostdumpindb";
import { removeFile } from "../../src/infracost/removefile";
import { downloadDump } from "../../src/infracost/downloaddump";
import { getDumpUrl } from "../../src/infracost/getdumpurl";
import { ParseCsvBatch } from "../../src/csvimport/parsecsvbatch";
import { shouldimportdump } from "../../src/infracost/shouldimportdump";

jest.mock("../../src/infracost/getdumpurl");
jest.mock("../../src/infracost/downloaddump");
jest.mock("../../src/infracost/extractdump");
jest.mock("../../src/infracost/removefile");
jest.mock("../../src/infracost/shouldimportdump");
jest.mock("../../src/db/models/services");
jest.mock("../../src/db");

jest.mock("../../src/csvimport/parsecsvbatch", () => {
    return {
        ParseCsvBatch: class _ParseCsvBatch {
            public static nextFn = jest.fn<() => Promise<[{ [data: string]: string }[], boolean]>>();
            public static instance: _ParseCsvBatch;
            public params: any[];

            constructor(...params: any[]) {
                this.params = params;
                _ParseCsvBatch.instance = this;
            }

            next = _ParseCsvBatch.nextFn;
        }
    };
});
describe("the dump download and dump import into the db", () => {
    let someDummyUrl: string = "https://my.dummy.url";
    beforeAll(async () => {
        (createServicesIndex as jest.Mock<any>).mockResolvedValue(undefined);
        (dropServices as jest.Mock<any>).mockResolvedValue(undefined);
        (insertServicesData as jest.Mock<any>).mockResolvedValue(undefined);
        (execQuery as jest.Mock<any>).mockImplementation(async (cb: (param: any) => Promise<void>) => {
            await cb({ "this should be a mongo client": true });
        });

        // @ts-ignore
        ParseCsvBatch.nextFn.mockResolvedValue([csvTestDbFixtureData, true]);
        (removeFile as jest.Mock<any>).mockResolvedValue(undefined);
        (downloadDump as jest.Mock<any>).mockResolvedValue(undefined);
        (getDumpUrl as jest.Mock<any>).mockResolvedValue(someDummyUrl);
        (shouldimportdump as jest.Mock<any>).mockResolvedValue(true);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("that the dump is successfully inserted into the db", async () => {
        await expect(loadinfracostdumpindb()).resolves.toBe(undefined);
        expect(createServicesIndex).toBeCalled();
        expect(dropServices).toBeCalled();
        expect(insertServicesData).toBeCalledWith(expect.anything(), transformedTestDbFixtureData);
        // @ts-ignore
        expect(ParseCsvBatch.nextFn).toHaveBeenCalledTimes(1);
        expect(removeFile).toHaveBeenCalledTimes(2);
        expect(downloadDump).toBeCalledWith(someDummyUrl, expect.anything());
        expect(getDumpUrl).toBeCalled();
    });
});
