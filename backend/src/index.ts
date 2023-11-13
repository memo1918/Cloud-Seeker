import { startServer } from "./express/setup";
import { registerRoutes } from "./routing/register";
import { setupDB } from "./db";
import { loadinfracostdumpindb } from "./infracost/loadinfracostdumpindb";

async function start() {
    registerRoutes();
    setupDB(process.env["DB_CONNECTION_STRING"]);
    startServer();
    loadinfracostdumpindb();
}

start();