import { jest } from "@jest/globals";

export function setupotherfnmock() {
    jest.mock("../src/test/otherfn", () => {
        const mockedFunctions: typeof import("../src/test/otherfn") = {
            mySpecialFunction: jest.fn(() => "")
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
