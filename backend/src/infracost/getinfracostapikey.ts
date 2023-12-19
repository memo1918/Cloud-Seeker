// get the infracost api key from the environment variables
export function getInfracostApiKey() {
    // if the dump url is set in the environment variables use that
    if (process.env["DUMMY_DATA_URL"]) {
        console.log({ message: "working with locally hosted dummy data" });
        return "working with locally hosted dummy data";
    }
    // if the infracost api key is not set in the environment variables throw an error
    if (!process.env["INFRACOST_API_KEY"]) {
        console.error({ message: "INFRACOST_API_KEY environment variable is missing", env: process.env });
        throw new Error("INFRACOST_API_KEY environment variable is missing");
    }
    // return the infracost api key
    return process.env["INFRACOST_API_KEY"];
}
