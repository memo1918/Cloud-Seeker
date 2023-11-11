import { getInfracostApiKey } from "./getinfracostapikey";
import axios, { AxiosResponse } from "axios";

export async function getDumpUrl() {
    let infracost_api_key = getInfracostApiKey();

    console.log({ message: "fetching dump download url", infracost_api_key, __filename });

    const downloadUrlObject: AxiosResponse<{ downloadUrl: string }> = await axios.get(
        "https://pricing.api.infracost.io/data-download/latest",
        {
            headers: {
                "X-Api-Key": infracost_api_key
            }
        }
    );

    console.log({ message: "got url", downloadUrl: downloadUrlObject.data, __filename });
    return downloadUrlObject.data.downloadUrl;
}
