import { jest } from "@jest/globals";

export function setupWebSiteVisitsMock() {
    jest.mock("../src/db/models/websitevisits", () => {
        const mockedFunctions: typeof import("../src/db/models/websitevisits") = {
            getVisits: jest.fn(() => Promise.resolve(5))
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
