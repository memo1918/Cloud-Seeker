// express setup
import { startServer } from "./express/setup";
import { registerRoutes } from "./routing/register";
import { setupDB } from "./db";
import { countLinesInCSV } from "./csvimport/importcsv";
import path from "path";
import { ReadCSV } from "./csvimport/readlinebyline";

registerRoutes();
setupDB(process.env["DB_CONNECTION_STRING"]);
startServer();

countLinesInCSV(path.resolve(".", "src", "dummyCsvImport.csv"))
    .then((lineCount) => {
        console.log(`Total lines in CSV: ${lineCount}`);
        return (`Total lines in CSV: ${lineCount}`);
    })
    .catch((error) => {
        console.error(`Error: ${error}`);
    });

const csvReader = new ReadCSV(path.resolve(".", "src", "dummyCsvImport.csv"));

const line1 = csvReader.readLine().then((data) => {
    console.log(data);
});
