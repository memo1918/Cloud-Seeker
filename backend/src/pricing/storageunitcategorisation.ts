import { UnitCategorisation } from "./units";

export class StorageUnitCategorisation implements UnitCategorisation {
    name: string = "StorageUnitCategorisation";
    units: { [key: string]: number } = {
        "b": 1,
        "B": 8,
        "Kb": 1024,
        "KB": 1024 ** 2,
        "Mb": 1024 ** 2 * 8,
        "MB": 1024 ** 3,
        "Gb": 1024 ** 3 * 8,
        "GB": 1024 ** 4,
        "Tb": 1024 ** 4 * 8,
        "TB": 1024 ** 5,
        "Pb": 1024 ** 5 * 8,
        "PB": 1024 ** 6,
        "Eb": 1024 ** 6 * 8,
        "EB": 1024 ** 7
    };

    private convert(size: number, fromUnit: string, toUnit: string): number | string {
        try {
            const sizeInBits = size * this.units[fromUnit];
            return sizeInBits / this.units[toUnit];
        } catch (error) {
            throw new Error("Invalid unit. supported units: b, B, Kb, KB, Mb, MB, Gb, GB, Tb, TB, Pb, PB, Eb, EB");
        }
    }

    constructor(public token: string) {
    }

    public static match(token: string): boolean {

        try {

        }

        return false;
    }
}