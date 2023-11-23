import { startServer } from "./express/setup";
import { registerRoutes } from "./routing/register";
import { setupDB, waitForDB } from "./db";
import { loadinfracostdumpindb } from "./infracost/loadinfracostdumpindb";
import { runMappingService } from "./mappingservice/runmappingservice";

async function start() {
    registerRoutes();
    setupDB(process.env["DB_CONNECTION_STRING"]);
    waitForDB()
        .then(() => {
            console.log({ message: "DB available" });
            console.log({ message: "now downloading dump" });
        })
        .then(loadinfracostdumpindb)
        .then(() => {
            console.log({ message: "download of dump complete" });
            console.log({ message: "now mapping instances" });
        })
        .then(runMappingService)
        .then(() => {
            console.log({ message: "mapping of instances complete" });
            console.log({ message: "now starting server" });
        })
        .then(startServer)
        .then(() => {
            console.log({ message: "starting server complete" });
        });
}

start();
