import { InputType, UnitCategorisation } from "./units";
import { NumberUnitCategorisation } from "./numberunitcategorisation";

export class DefaultUnitCategorisation implements UnitCategorisation {
    unitName: string = "DefaultUnitCategorisation";
    options: any[] | null = null;
    type: string = "string";
    acceptsUserInput: boolean = false;
    inputType: InputType = null;
    selected = null;

    constructor(public token: string) {
    }

    public static match(token: string): boolean {
        return true;
    }

    public static create(token: string): UnitCategorisation {
        return new DefaultUnitCategorisation(token);
    }

    expand(prevUnit: UnitCategorisation | null): UnitCategorisation[] {
        if (prevUnit == null) {
            return [NumberUnitCategorisation.create("1"), this];
        }

        if (prevUnit instanceof DefaultUnitCategorisation) {
            prevUnit.token = `${prevUnit.token} ${this.token}`;
            return [];
        }

        return [this];
    }

    isCompatible(other: UnitCategorisation): boolean {
        return other instanceof DefaultUnitCategorisation;
    }

    getConversionFactor(other: UnitCategorisation): number {
        return 1;
    }

  getCategorisationString(): string {
    return this.token;
  }
}
