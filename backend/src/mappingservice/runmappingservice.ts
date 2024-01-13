import { CategoryProvider } from "../categories/categoryprovider";
import { MappingMongoDB } from "./mappingdb";
import { ReadCSV } from "../csvimport/readcsv";
import { MappingService } from "./mappingservice";

/**
 * runs the mapping service
 * @returns {Promise<void>} a promise that resolves when the mapping service is completed
 */
export async function runMappingService(): Promise<void> {
    let path = process.env.DUMMY_CSV_IMPORT || "";
    let MS = new MappingService(new CategoryProvider(), new MappingMongoDB(), new ReadCSV(path));
    await MS.start();
}
