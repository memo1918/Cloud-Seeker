import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import fs from "fs";
import { removeFile } from "../../src/infracost/removefile";

jest.mock("fs");
beforeEach(() => {
    jest.clearAllMocks();
});
describe("behaviour of extracting the data from the archive", () => {
    test("that unlink function has been called", async () => {
        const files = ["1", "2", "3"];
        //@ts-ignore
        (fs.unlink as jest.Mock<any>).mockResolvedValue(undefined);

        await expect(removeFile(...files)).resolves.toBe(undefined);

        expect(fs.unlink).toHaveBeenCalledTimes(files.length);
        expect(fs.unlink).nthCalledWith(1, "1", expect.anything());
        expect(fs.unlink).nthCalledWith(2, "2", expect.anything());
        expect(fs.unlink).nthCalledWith(3, "3", expect.anything());
    });
});
