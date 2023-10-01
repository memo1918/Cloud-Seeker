import { jest } from "@jest/globals";

export function setupExpressMock() {
    jest.mock("express", () => {
        const originalModule = jest.requireActual<typeof import("express")>("express");
        const mockedFunctions = {};

        for (const originalModuleKey in originalModule) {
            //@ts-ignore
            if (typeof originalModule[originalModuleKey] == "function") {
                // @ts-ignore
                mockedFunctions[originalModuleKey] = jest.fn(originalModule[originalModuleKey]);
            }
        }
        return {
            __esModule: true,
            ...originalModule,
            ...mockedFunctions,
            default: jest.fn().mockReturnValue({
                use: jest.fn().mockReturnThis()
            })
        };
    });
}
