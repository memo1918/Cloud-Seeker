import { jest } from "@jest/globals";

export function setupExpressSetupMock() {
    jest.mock("../src/express/setup", () => {
        const originalModule = jest.requireActual<typeof import("../src/express/setup")>("../src/express/setup");

        return {
            __esModule: true,
            ...originalModule,
            stopServer: jest.fn(),
            startServer: jest.fn()
        };
    });
}
