import { UnitCategorisation } from "./units";

export class StorageUnitCategorisation implements UnitCategorisation {
    name: string = "StorageUnitCategorisation";

    // unit -> bit
    private static units: { [key: string]: number } = {
        B: 8,
        Bytes: 8,
        KB: 8 * 1024 ** 1,
        MB: 8 * 1024 ** 2,
        GB: 8 * 1024 ** 3,
        gigabyte: 8 * 1024 ** 3,
        Gigabytes: 8 * 1024 ** 3,
        Gigabyte: 8 * 1024 ** 3,
        Kilo: 1024 ** 1,
        Mega: 1024 ** 2,
        Giga: 1024 ** 3,
        Terra: 1024 ** 4,
        Peta: 1024 ** 5,
        Exa: 1024 ** 6,
        kilo: 1024 ** 1,
        mega: 1024 ** 2,
        giga: 1024 ** 3,
        terra: 1024 ** 4,
        peta: 1024 ** 5,
        exa: 1024 ** 6,
        TB: 8 * 1024 ** 4,
        PB: 8 * 1024 ** 5,
        EB: 8 * 1024 ** 6,
        b: 1,
        Kb: 1000 ** 1,
        Mb: 1000 ** 2,
        Gb: 1000 ** 3,
        Pb: 1000 ** 4,
        Eb: 1000 ** 5,
        Kibit: 2 ** 10,
        Mibit: 2 ** 20,
        Gibit: 2 ** 30,
        Tibit: 2 ** 40,
        Pibit: 2 ** 50,
        Eibit: 2 ** 60,
        Ki: 2 ** 10 / (8 * 8),
        Mi: 2 ** 20 / (8 * 8),
        Gi: 2 ** 30 / (8 * 8),
        Ti: 2 ** 40 / (8 * 8),
        Pi: 2 ** 50 / (8 * 8),
        Ex: 2 ** 60 / (8 * 8),
        kibibyte: 2 ** 10 / 8,
        mebibyte: 2 ** 20 / 8,
        gibibyte: 2 ** 30 / 8,
        tebibyte: 2 ** 40 / 8,
        pebobyte: 2 ** 50 / 8,
        exbibyte: 2 ** 60 / 8,
        KIB: 2 ** 10 / 8,
        MEB: 2 ** 20 / 8,
        GIB: 2 ** 30 / 8,
        TEB: 2 ** 40 / 8,
        PEB: 2 ** 50 / 8,
        EXB: 2 ** 60 / 8,
        MIB: 2 ** 20 / 8,
        TIB: 2 ** 40 / 8,
        PIB: 2 ** 50 / 8,
        EIB: 2 ** 60 / 8
    };

    public value: number;

    private convert(size: number, fromUnit: string, toUnit: string): number | string {
        try {
            const sizeInBits = size * StorageUnitCategorisation.units[fromUnit];
            return sizeInBits / StorageUnitCategorisation.units[toUnit];
        } catch (error) {
            throw new Error("Invalid unit. supported units: " + Object.keys(StorageUnitCategorisation.units).join(", "));
        }
    }

    constructor(public token: string) {
        this.token = StorageUnitCategorisation.parse(token);
        this.value = StorageUnitCategorisation.units[this.token];
    }

    public static parse(token: string) {
        token = token.trim();
        return Object.keys(StorageUnitCategorisation.units).find(i => token == i) || "";
    }

    public static match(token: string): boolean {
        return StorageUnitCategorisation.parse(token) != "";
    }

    public static create(token: string): UnitCategorisation {
        return new StorageUnitCategorisation(token);
    }
}