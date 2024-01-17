import { getInfracostApiKey } from "./getinfracostapikey";
import axios, { AxiosResponse } from "axios";

/**
 * This function fetches the dump download url from infracost api
 * @returns {Promise<string>} a promise that resolves when the dump download url is fetched
 */
export async function getDumpUrl() {
    let infracost_api_key = getInfracostApiKey();
    // if the dump url is set in the environment variables use that
    if (process.env["DUMMY_DATA_URL"]) {
        console.log({ message: "working with locally hosted dummy data", __filename });
        return Promise.resolve(process.env["DUMMY_DATA_URL"]);
    }
    // if the infracost api key is not set in the environment variables throw an error
    if (!infracost_api_key) {
        console.error({ message: "INFRACOST_API_KEY environment variable is missing", env: process.env, __filename });
        throw new Error("INFRACOST_API_KEY environment variable is missing");
    }
    console.log({ message: "fetching dump download url", infracost_api_key, __filename });
    // fetch the dump download url from infracost api
    // this is done by sending a get request to https://pricing.api.infracost.io/data-download/latest
    // with the infracost api key as the X-Api-Key header
    const downloadUrlObject: AxiosResponse<{ downloadUrl: string }> = await axios.get(
        "https://pricing.api.infracost.io/data-download/latest",
        {
            headers: {
                "X-Api-Key": infracost_api_key
            }
        }
    );
    // log the dump download url and return it
    console.log({ message: "got url", downloadUrl: downloadUrlObject.data, __filename });
    return downloadUrlObject.data.downloadUrl;
}
