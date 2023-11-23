import { CategoryProvider } from "../categories/categoryprovider";
import { MappingMongoDB } from "./mappingdb";
import { ReadCSV } from "../csvimport/readcsv";
import { MappingService } from "./mappingservice";

export async function runMappingService() {
    let path = process.env.DUMMY_CSV_IMPORT || "";
    let MS = new MappingService(new CategoryProvider(), new MappingMongoDB(), new ReadCSV(path));
    await MS.start();
}
