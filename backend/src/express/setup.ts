import express from "express";
import { createServer } from "http";

// this file contains the express setup
// it exports the express app and the http server
// it also exports functions to start and stop the server
// the server is started on port 3000

export const app = express();
// parse json, text and urlencoded data
app.use(express.json({}));
app.use(express.text({}));
app.use(express.urlencoded({ extended: true }));

export const server = createServer(app);
// this function starts the server
// it listens on port 3000
// it also listens for the SIGTERM signal and calls the stopServer function
// this is done in order to free resources and free the port 3000 for a restart in development mode
export function startServer() {
    process.on("SIGTERM", stopServer);
    server.listen(3000, () => console.log(`server listening on port ${3000}.`));
}

// this function stops the server
export function stopServer() {
    // stop listening for the SIGTERM signal
    process.off("SIGTERM", stopServer);
    // close the server if it is listening
    if (server.listening) {
        server.close(() => {});
        console.log("server closed");
    }
}
