import { jest } from "@jest/globals";

export function setupDbIndexMock() {
    jest.mock("../src/db/index", () => {
        const mockedFunctions: typeof import("../src/db/index") = {
            setURI: jest.fn(),
            execQuery: jest.fn(async (): Promise<any> => {
                return null;
            }),
            setupDB: jest.fn(),
            waitForDB: jest.fn<() => Promise<void>>().mockResolvedValue(undefined)
        };

        return {
            __esModule: true,
            ...mockedFunctions,
            default: jest.fn().mockReturnValue({
                use: jest.fn().mockReturnThis()
            })
        };
    });
}
