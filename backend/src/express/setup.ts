import cors from "cors";
import express, { json, text } from "express";
import { createServer } from "http";

export const app = express();
export const server = createServer(app);

export function startServer() {
    app.use(text());
    app.use(json());
    app.use(cors());
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
