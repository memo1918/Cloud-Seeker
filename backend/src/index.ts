// express setup
import { startServer } from "./express/setup";
import { registerRoutes } from "./routing/register";
import { setupDB } from "./db";
import { ReadCSV } from "./csvimport/readlinebyline";
import { countLinesInCSV } from "./csvimport/importcsv";

registerRoutes();
setupDB(process.env["DB_CONNECTION_STRING"]);
startServer();


const csvReader = new ReadCSV("./src/mapping-information.csv");
(async () => {
    let amountOfLines = await countLinesInCSV("./src/mapping-information.csv");
    console.log(amountOfLines);
    let counter = 0;
    try {
        while (counter <= amountOfLines) {
            const data = await csvReader.readLine();
            console.log(data);
            counter++;
        }
    } catch (error) {
        console.error("Error reading CSV file:", error);
    }
})();

