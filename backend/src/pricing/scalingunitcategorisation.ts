import { UnitCategorisation } from "./units";

export class ScalingUnitCategorisation implements UnitCategorisation {
    name: string = "ScalingUnitCategorisation";
    public factor: number = 0;
    private static unitTable: { [key: string]: number } = {
        K: 10 ** 3,
        M: 10 ** 4,
        G: 10 ** 5,
        T: 10 ** 6,
        P: 10 ** 7,
        E: 10 ** 8,
        Thousands: 10 ** 3
    };

    private convert(size: number, fromUnit: string, toUnit: string): number {
        try {
            const sizeInBits = size * ScalingUnitCategorisation.unitTable[fromUnit];
            return sizeInBits / ScalingUnitCategorisation.unitTable[toUnit];
        } catch (error) {
            throw new Error(
                "Invalid unit. Supported units: " + Object.keys(ScalingUnitCategorisation.unitTable).join(", ")
            );
        }
    }

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
}
