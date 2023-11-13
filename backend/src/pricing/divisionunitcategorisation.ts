import { UnitCategorisation } from "./units";

export class DivisionUnitCategorisation implements UnitCategorisation {
    name: string = "DivisionUnitCategorisation";

    constructor(public token: string) {}

    public static match(token: string): boolean {
        // normalise token
        token = token.trim().toLowerCase();

        return token == "/" || token == "\\" || token == "-" || token == "per" || token == "p";
    }

    public static create(token: string): UnitCategorisation {
        return new DivisionUnitCategorisation(token);
    }
}
