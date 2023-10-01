// express setup
import { startServer, stopServer } from "./express/setup";
import { registerRoutes } from "./routing/register";

registerRoutes();
startServer();
