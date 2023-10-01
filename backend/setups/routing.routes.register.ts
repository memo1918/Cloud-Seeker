import { jest } from "@jest/globals";
export function setupRoutingRegisterMock() {
    jest.mock("../src/routing/register", () => {
        const originalModule = jest.requireActual<typeof import("../src/routing/register")>("../src/routing/register");

        return {
            __esModule: true,
            ...originalModule,
            registerRoutes: jest.fn()
        };
    });
}
