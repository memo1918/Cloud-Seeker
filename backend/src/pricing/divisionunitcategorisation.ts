import { UnitCategorisation } from "./units";

export class DivisionUnitCategorisation implements UnitCategorisation {
    name: string = "DivisionUnitCategorisation";

    constructor(public token: string) {
    }

    public static match(token: string): boolean {
        // normalise token
        token = token.trim();


        return token == "/" || token == "\\" || token == "-";
    }
}