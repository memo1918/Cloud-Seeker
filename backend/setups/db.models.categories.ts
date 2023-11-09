import {jest} from "@jest/globals";

export function setupCategoriesMock() {
    jest.mock("../src/db/models/categories", () => {
        const mockedFunctions: typeof import("../src/db/models/categories") = {
            _getAllCategories: jest.fn(() => Promise.resolve([]))
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
