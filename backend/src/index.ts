import { startServer } from "./express/setup";
import { registerRoutes } from "./routing/register";
import { setupDB, waitForDB } from "./db";
import { loadinfracostdumpindb } from "./infracost/loadinfracostdumpindb";
import { runMappingService } from "./mappingservice/runmappingservice";

/**
 * starts the server
 */
async function start() {
    console.log({ message: "registering routes" });
    registerRoutes();
    console.log({ message: "setting up db" });
    setupDB(process.env["DB_CONNECTION_STRING"]);
    console.log({ message: "waiting for db" });
    // wait for the db to be available
    waitForDB()
        .then(() => {
            console.log({ message: "DB available" });
            console.log({ message: "now downloading dump" });
        })
        // load the infracost dump into the db
        .then(loadinfracostdumpindb)
        .then(() => {
            console.log({ message: "download of dump complete" });
            console.log({ message: "now mapping instances" });
        })
        // run the mapping service
        .then(runMappingService)
        .then(() => {
            console.log({ message: "mapping of instances complete" });
            console.log({ message: "now starting server" });
        })
        // start the server
        .then(startServer)
        .then(() => {
            console.log({ message: "starting server complete" });
        });
}

/**
 * starts the server by default when the file is executed
 */
start().then(() => {
    console.log({ message: "startup complete" });
});
