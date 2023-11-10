import { UnitCategorisation } from "./units";

export class CountableUnitCategorisation implements UnitCategorisation {
    name: string = "StorageUnitCategorisation";

    constructor(public token: string) {
    }

    public static match(token: string): boolean {
        return false;
    }
}