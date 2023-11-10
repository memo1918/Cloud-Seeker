import { describe, expect, test, jest } from "@jest/globals";
import { MappingService } from "../../src/mappingservice/mappingservice";
import { CategoryProvider } from "../../src/categories/categoryprovider";
import { MappingDB } from "../../src/mappingservice/mappingdb";
import { CsvData, CSVReader } from "../../src/csvimport/CSVReader";
import { Document, WithId } from "mongodb";
import { SAMPLE_CATEGORY, SAMPLE_SKUARR, SAMPE_INSTANCE, SAMPLE_ATTRIBUTES } from "./fixtures";
import { Category } from "../../src/mappingservice/interfaces/category.interface";
import { InstanceComparison } from "../../src/mappingservice/interfaces/instancecomparison.interface";
import { Instance } from "../../src/mappingservice/interfaces/instance.interface";

describe("MappingService class test", () => {
    class MockCategoryProvider extends CategoryProvider {
        async findCategory(instance: Instance): Promise<Category> {
            return SAMPLE_CATEGORY;
        }
    }

    class MockMappingDB implements MappingDB {
        findSkus(skuArr: string[]): Promise<WithId<Document>[]> {
            if (JSON.stringify(skuArr.sort()) !== JSON.stringify(Object.values(MockReadCSV.dummydata).sort())) {
                console.log(skuArr.sort());
                console.log(Object.values(MockReadCSV.dummydata).sort());
                throw new Error("not expected value");
            }

            const dummyReturn: WithId<Document>[] = SAMPLE_SKUARR;

            return Promise.resolve(dummyReturn);
        }

        pushCategories(categories: Category[]): Promise<void> {
            return Promise.resolve(undefined);
        }

        dropInstanceComparison(): Promise<void> {
            return Promise.resolve(undefined);
        }

        pushInstanceComparison(instanceComparison: InstanceComparison): Promise<void> {
            return Promise.resolve(undefined);
        }
    }

    class MockReadCSV implements CSVReader {
        public static dummydata = {
            aws: "aws1234",
            gcp: "gcp1234",
            azure: "azure1234"
        };

        private hasResolvedOnce = false;

        readLine(): Promise<CsvData> {
            if (this.hasResolvedOnce) {
                throw new Error("done");
            }
            this.hasResolvedOnce = true;
            return Promise.resolve(MockReadCSV.dummydata);
        }
    }

    test("test if getNextLine() returns correct", async () => {
        let instance = new MappingService(new MockCategoryProvider(), new MockMappingDB(), new MockReadCSV());
        await expect(instance.getNextLine()).resolves.toEqual(Object.values(MockReadCSV.dummydata));
    });

    test("test start function", async () => {
        let mockinstance = new MockMappingDB();
        let instance = new MappingService(new MockCategoryProvider(), mockinstance, new MockReadCSV());
        expect(() => instance.start()).not.toThrowError();
    });

    test("test function forEachSku", async () => {
        let mockinstance = new MockReadCSV();
        let instance = new MappingService(new MockCategoryProvider(), new MockMappingDB(), mockinstance);
        let data = await instance.getNextLine();
        const createInstanceCompareSpy = jest.spyOn(instance, "createInstanceCompare");

        // expect(() => instance.forEachSku(data)).not.toThrowError();
        await instance.forEachSku(data);
        expect(createInstanceCompareSpy).toHaveBeenCalled();
    });

    test("test function getattributes ", async () => {
        let instance = new MappingService(new MockCategoryProvider(), new MockMappingDB(), new MockReadCSV());
        expect(instance.getAttributesForInstance(SAMPE_INSTANCE, SAMPLE_CATEGORY)).toEqual(SAMPLE_ATTRIBUTES);
    });

    test("test function createInstanceCompare ", async () => {
        let instance = new MappingService(new MockCategoryProvider(), new MockMappingDB(), new MockReadCSV());
        expect(() =>
            instance.createInstanceCompare([SAMPE_INSTANCE, SAMPE_INSTANCE], SAMPLE_ATTRIBUTES)
        ).not.toThrowError();
    });
});
