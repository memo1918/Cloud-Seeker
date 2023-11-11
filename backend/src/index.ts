// express setup
import { startServer } from "./express/setup";
import { registerRoutes } from "./routing/register";
import { setupDB } from "./db";

registerRoutes();
setupDB(process.env["DB_CONNECTION_STRING"]);
startServer();