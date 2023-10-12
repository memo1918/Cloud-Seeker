import express, { json, text } from "express";
import { createServer } from "http";

export const app = express();
export const server = createServer(app);

export function startServer() {
    app.use(text());
    app.use(json());
    // cors
    // might do a env variable with the host so we can match dynamic clients and only add the headers if necessary
    // app.use((req, res) => {
    //     if (req.hostname.indexOf("localhost") > -1) {
    //         // Website you wish to allow to connect
    //         res.setHeader('Access-Control-Allow-Origin', '*');
    //
    //         // Request methods you wish to allow
    //         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //
    //         // Request headers you wish to allow
    //         res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    //
    //         // Set to true if you need the website to include cookies in the requests sent
    //         // to the API (e.g. in case you use sessions)
    //         res.setHeader('Access-Control-Allow-Credentials', "true");
    //     }
    //
    // });
    process.on("SIGTERM", stopServer);
    server.listen(3000, () => console.log(`server listening on port ${3000}.`));
}

export function stopServer() {
    process.off("SIGTERM", stopServer);

    if (server.listening) {
        server.close(() => {});
        console.log("server closed");
    }
}
