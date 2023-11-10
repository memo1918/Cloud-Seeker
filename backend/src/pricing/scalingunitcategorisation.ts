import { UnitCategorisation } from "./units";

export class ScalingUnitCategorisation implements UnitCategorisation {
    name: string = "ScalingUnitCategorisation";
    public value: number = 0;
    private unitTable: { [key: string]: number } = {
        "K": 10 ** 3,
        "M": 10 ** 4,
        "G": 10 ** 5,
        "T": 10 ** 6,
        "P": 10 ** 7,
        "E": 10 ** 8
    };


    private convert(size: number, fromUnit: string, toUnit: string): number {
        try {
            const sizeInBits = size * this.unitTable[fromUnit];
            return sizeInBits / this.unitTable[toUnit];
        } catch (error) {
            throw new Error("Invalid unit. Supported units: b, B, Kb, KB, Mb, MB, Gb, GB, Tb, TB, Pb, PB, Eb, EB");
        }
    }


    private parse(unit: string): number {

        if (this.unitTable[unit] == undefined) {
            unit = Object.keys(this.unitTable).find(i => unit.startsWith(i)) || "";
        }


        return this.unitTable[unit];
    }

    constructor(public token: string) {
        this.value = parseInt(this.token);
    }

    public static match(token: string): boolean {

        // normalise
        token = token.trim();

        return !isNaN(parseInt(token));
    }
}