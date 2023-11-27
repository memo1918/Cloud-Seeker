import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";

describe("get infracost api key module", () => {
    let module: typeof import("../../src/infracost/getinfracostapikey");

    const invfracostApiKeyGoesHere = "invfracost api key goes here";

    beforeEach(async () => {
        process.env["INFRACOST_API_KEY"] = invfracostApiKeyGoesHere;
        module = await import("../../src/infracost/getinfracostapikey");
    });
    afterEach(async () => {});

    test("that the infracost throws if the parameter is not set", async () => {
        delete process.env["INFRACOST_API_KEY"];
        const { getInfracostApiKey } = module;

        let result = expect(() => getInfracostApiKey());
        result.toThrowError("INFRACOST_API_KEY");
    });

    test("that the infracost fetched correctly from the environment", async () => {
        const { getInfracostApiKey } = module;
        expect(getInfracostApiKey()).toBe(invfracostApiKeyGoesHere);
    });
});
