import { InputType, UnitCategorisation } from "./units";
import { isNaN, parseInt } from "lodash";

export class NumberUnitCategorisation implements UnitCategorisation {
    unitName: string = "NumberUnitCategorisation";
    public value: number = 0;
    public type = "number";
    public options = null;
    public acceptsUserInput = true;
    public inputType: InputType = "input";

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

    public multiply(factor: number) {
        this.value *= factor;
    }

    public divide(factor: number) {
        this.value /= factor;
    }

    public add(constant: number) {
        this.value += constant;
    }

    expand(prevUnit: UnitCategorisation | null): UnitCategorisation[] {
        if (prevUnit != null && prevUnit instanceof NumberUnitCategorisation) {
            prevUnit.add(this.value);
            return [];
        }

        if (prevUnit != null && !(prevUnit instanceof NumberUnitCategorisation)) {
            return [NumberUnitCategorisation.create("1"), this];
        }

        return [this];
    }

    isCompatible(other: UnitCategorisation): boolean {
        return other instanceof NumberUnitCategorisation;
    }
}
