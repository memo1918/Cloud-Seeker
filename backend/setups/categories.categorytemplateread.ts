import { jest } from "@jest/globals";
import { getCategoryTemplate } from "../src/categories/categorytemplateread";
import { Category } from "../src/mappingservice/interfaces";

export function setupgetCategoryTemplateMock() {
    jest.mock("../src/categories/categorytemplateread", () => {
        const mockedFunctions: typeof import("../src/categories/categorytemplateread") = {
            getCategoryTemplate: jest.fn((): Category[] => [])
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
