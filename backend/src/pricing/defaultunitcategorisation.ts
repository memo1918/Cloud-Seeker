import { UnitCategorisation } from "./units";

export class DefaultUnitCategorisation implements UnitCategorisation {
    name: string = "DefaultUnitCategorisation";

    constructor(public token: string) {
    }

    public static match(token: string): boolean {
        return true;
    }

    public static create(token: string): UnitCategorisation {
        return new DefaultUnitCategorisation(token);
    }
}