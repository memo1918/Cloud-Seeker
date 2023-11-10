import { UnitCategorisation } from "./units";

export class NumberUnitCategorisation implements UnitCategorisation {
    name: string = "NumberUnitCategorisation";
    public value: number = 0;

    constructor(public token: string) {
        this.value = parseInt(this.token);
    }

    public static match(token: string): boolean {

        // normalise
        token = token.trim();

        return !isNaN(parseInt(token));
    }
}