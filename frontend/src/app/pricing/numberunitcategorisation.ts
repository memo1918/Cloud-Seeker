import { InputType, UnitCategorisation } from "./units";
import { isNaN, parseInt } from "lodash";

export class NumberUnitCategorisation implements UnitCategorisation {
    unitName: string = "NumberUnitCategorisation";
    public value: number = 0;
    public type = "number";
    public options = null;
    public acceptsUserInput = true;
    public inputType: InputType = "input";

    get selected() {
        return this.value.toString();
    }

    set selected(value: string) {
        this.value = Number(value);
    }

    constructor(public token: string) {
        this.value = parseInt(this.token);
        this.selected = this.value.toString();
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
        this.selected = this.value.toString();
    }

    public divide(factor: number) {
        this.value /= factor;
        this.selected = this.value.toString();
    }

    public add(constant: number) {
        this.value += constant;
        this.selected = this.value.toString();
    }

    expand(prevUnit: UnitCategorisation | null): UnitCategorisation[] {
        if (prevUnit != null && prevUnit instanceof NumberUnitCategorisation) {
            prevUnit.add(this.value);
            return [];
        }

        return [this];
    }

    isCompatible(other: UnitCategorisation): boolean {
        return other instanceof NumberUnitCategorisation;
    }

    getConversionFactor(target: UnitCategorisation): number {

        if (!this.isCompatible(target) || !(target instanceof NumberUnitCategorisation)) throw new Error(`Incompatible units ${this.unitName} and ${target.unitName}`);
        return target.value / this.value;
    }
}
