export function getInfracostApiKey() {

    if (process.env["DUMMY_DATA_URL"]) {
        console.log({ message: "working with locally hosted dummy data" });
        return "working with locally hosted dummy data";
    }

    if (!process.env["INFRACOST_API_KEY"]) {
        console.error({ message: "INFRACOST_API_KEY environment variable is missing", env: process.env });
        throw new Error("INFRACOST_API_KEY environment variable is missing");
    }
    return process.env["INFRACOST_API_KEY"];
}
