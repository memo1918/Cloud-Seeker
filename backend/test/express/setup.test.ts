import { afterEach, beforeAll, beforeEach, describe, expect, jest, test } from "@jest/globals";
import { server, startServer, stopServer } from "../../src/express/setup";
import { setupExpressMock } from "../../setups/express";

beforeAll(setupExpressMock);
jest.mock("process");

describe("express setup", () => {
    const realProcess = process;
    // const originalSetupModule = jest.requireActual<typeof import("../../src/express/setup")>("../../src/express/setup");
    // const mockSetupModules = jest.requireMock<typeof import("../../src/express/setup")>("../../src/express/setup");
    const onMock = jest.fn((...args: any[]) => {});
    const offMock = jest.fn((...args: any[]) => {});

    beforeEach(() => {
        global.process = { ...realProcess, on: onMock as any, off: offMock as any };
    });

    afterEach(() => {
        stopServer();
        global.process = realProcess;
        jest.clearAllMocks();
    });

    test("startServer to start listening on port 3000", () => {
        expect(() => startServer()).not.toThrow();
        expect(onMock).toBeCalled();
        expect(server.listening).toBe(true);
    });

    test("stopServer to stop listening", () => {
        expect(() => startServer()).not.toThrow();
        expect(() => stopServer()).not.toThrow();
        expect(offMock).toBeCalled();
        expect(server.listening).toBe(false);
    });
});
