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
