import { InputType, UnitCategorisation } from "./units";
import { NumberUnitCategorisation } from "./numberunitcategorisation";

export class ScalingUnitCategorisation implements UnitCategorisation {
    unitName: string = "ScalingUnitCategorisation";
    public factor: number;
    acceptsUserInput: boolean = true;
    inputType: InputType = "dropdown";
    options: any[] | null = ["K", "M", "G", "T", "E", "P"];
    type: string = "string";

    private static unitTable: { [key: string]: number } = {
        K: 10 ** 3,
        M: 10 ** 4,
        G: 10 ** 5,
        T: 10 ** 6,
        P: 10 ** 7,
        E: 10 ** 8,
        Thousands: 10 ** 3
    };

    private parse(unit: string): number {
        if (ScalingUnitCategorisation.unitTable[unit] == undefined) {
            unit = Object.keys(ScalingUnitCategorisation.unitTable).find((i) => unit == i) || "";
        }

        return ScalingUnitCategorisation.unitTable[unit];
    }

    constructor(public token: string) {
        this.factor = this.parse(this.token);
    }

    public static match(token: string): boolean {
        // normalise
        token = token.trim();

        return ScalingUnitCategorisation.unitTable[token] != undefined;
    }

    public static create(token: string): UnitCategorisation {
        return new ScalingUnitCategorisation(token);
    }

    expand(prevUnit: UnitCategorisation | null): UnitCategorisation[] {

        if (prevUnit != null && prevUnit instanceof NumberUnitCategorisation) {
            prevUnit.multiply(this.factor);
            return [];
        }

        return [NumberUnitCategorisation.create(this.factor.toString())];
    }

    isCompatible(other: UnitCategorisation): boolean {
        return other instanceof ScalingUnitCategorisation;
    }
}
