import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import axios from "axios";
import { getInfracostApiKey } from "../../src/infracost/getinfracostapikey";

jest.mock("axios");
jest.mock("../../src/infracost/getinfracostapikey");

describe("get infracost api key module", () => {
    let module: typeof import("../../src/infracost/getdumpurl");

    beforeEach(async () => {
        module = await import("../../src/infracost/getdumpurl");
    });

    test("that the correct url is returned", () => {
        const myUrl = "https://myurl.test";
        (axios.get as jest.Mock<any>).mockResolvedValue({ data: { downloadUrl: myUrl } });

        let mySecretKey = "my-secret-key";
        (getInfracostApiKey as jest.Mock<any>).mockReturnValue(mySecretKey);

        expect(module.getDumpUrl()).resolves.toBe(myUrl);

        expect(getInfracostApiKey).toBeCalled();

        expect(axios.get).toBeCalledWith(
            "https://pricing.api.infracost.io/data-download/latest",
            expect.objectContaining({
                headers: {
                    "X-Api-Key": mySecretKey
                }
            })
        );
    });
});
