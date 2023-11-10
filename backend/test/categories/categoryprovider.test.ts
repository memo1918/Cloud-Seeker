import { afterEach, beforeAll, beforeEach, describe, expect, test, jest } from "@jest/globals";
import { setupgetCategoryTemplateMock } from "../../setups/categories.categorytemplateread";
import { Category } from "../../src/mappingservice/interfaces/category.interface";
import { Instance } from "../../src/mappingservice/interfaces/instance.interface";

beforeAll(setupgetCategoryTemplateMock);
beforeEach(() => {
    jest.clearAllMocks();
});

describe("CategoryProvider class test", () => {
    test("test categories variable", async () => {
        const { getCategoryTemplate } = await import("../../src/categories/categorytemplateread");
        let getCategoryTemplateMock = getCategoryTemplate as jest.Mock;
        getCategoryTemplateMock.mockReturnValue([{ name: "Compute" }, { name: "Storage" }]);

        const { CategoryProvider } = await import("../../src/categories/categoryprovider");
        const instanceClass = new CategoryProvider();

        expect(instanceClass.categories).toEqual(expect.arrayContaining([{ name: "Compute" }]));
    });

    test("test findCategory correct return ", async () => {
        const { getCategoryTemplate } = await import("../../src/categories/categorytemplateread");
        let getCategoryTemplateMock = getCategoryTemplate as jest.Mock;
        let testCategory: Partial<Category>[] = [
            {
                discovery: {
                    aws: {
                        key: ["productFamily"],
                        value: ["Compute Instance"]
                    }
                }
            }
        ];
        getCategoryTemplateMock.mockReturnValue(testCategory);

        const { CategoryProvider } = await import("../../src/categories/categoryprovider");
        const instanceClass = new CategoryProvider();

        let instance = {
            vendorName: "aws",
            productFamily: "Compute Instance"
        } as Instance;

        for (const cat of testCategory) {
            expect(await instanceClass.findCategory(instance)).toEqual(cat);
        }
    });

    test("test error findCategory false vendorName ", async () => {
        const { getCategoryTemplate } = await import("../../src/categories/categorytemplateread");
        let getCategoryTemplateMock = getCategoryTemplate as jest.Mock;
        let testCategory: Partial<Category>[] = [
            {
                discovery: {
                    test: {
                        key: ["productFamily"],
                        value: ["Compute Instance"]
                    }
                }
            }
        ];
        getCategoryTemplateMock.mockReturnValue(testCategory);

        const { CategoryProvider } = await import("../../src/categories/categoryprovider");
        const instanceClass = new CategoryProvider();

        let instance = {
            vendorName: "aws",
            productFamily: "Compute Instance"
        } as Instance;

        await expect(instanceClass.findCategory(instance)).rejects.toThrow("UwU, didn't find the vendor :/ ");
    });

    test("test error findCategory category not found ", async () => {
        const { getCategoryTemplate } = await import("../../src/categories/categorytemplateread");
        let getCategoryTemplateMock = getCategoryTemplate as jest.Mock;
        let testCategory: Partial<Category>[] = [
            {
                discovery: {
                    aws: {
                        key: ["productFamily"],
                        value: ["test"]
                    }
                }
            }
        ];
        getCategoryTemplateMock.mockReturnValue(testCategory);

        const { CategoryProvider } = await import("../../src/categories/categoryprovider");
        const instanceClass = new CategoryProvider();

        let instance = {
            vendorName: "aws",
            productFamily: "Compute Instance"
        } as Instance;

        await expect(instanceClass.findCategory(instance)).rejects.toThrow("UwU, didn't find the category :/ ");
    });
});
