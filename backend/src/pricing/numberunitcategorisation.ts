import { InputType, UnitCategorisation } from "./units";

export class NumberUnitCategorisation implements UnitCategorisation {
    name: string = "NumberUnitCategorisation";
    public value: number = 0;
    public type = "number";
    public options = null;
    public acceptsUserInput = true;
    public inputType: InputType = "input";

    public accepts: [type: string, options: any[]] = ["number", []];

    constructor(public token: string) {
        this.value = parseInt(this.token);
    }

    public static match(token: string): boolean {
        // normalise
        token = token.trim();

        return !isNaN(parseInt(token));
    }

    public static create(token: string): UnitCategorisation {
        return new NumberUnitCategorisation(token);
    }
}
