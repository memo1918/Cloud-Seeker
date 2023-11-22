import { InputType, UnitCategorisation } from "./units";
import { NumberUnitCategorisation } from "./numberunitcategorisation";

export type StorageUnitSize = "Byte" | "Kilobyte" | "Megabyte" | "Gigabyte" | "Terabyte" | "Petabyte" | "Exabyte";

export class StorageUnitCategorisation implements UnitCategorisation {
    unitName: string = "StorageUnitCategorisation";
    acceptsUserInput: boolean = true;
    inputType: InputType = "dropdown";

    // to convert
    // const sizeInBits = size * StorageUnitCategorisation.units[fromUnit][0];
    // return sizeInBits / StorageUnitCategorisation.units[toUnit][0];
    // unit -> bit
    private static units: { [key: string]: [number, StorageUnitSize] } = {
        b: [1, "Byte"],
        bit: [1, "Byte"],
        Bit: [1, "Byte"],
        Bits: [1, "Byte"],

        B: [8, "Byte"],
        byte: [8, "Byte"],
        Bytes: [8, "Byte"],
        bytes: [8, "Byte"],

        KB: [8 * 1024 ** 1, "Kilobyte"],
        Kilobyte: [8 * 1024 ** 2, "Kilobyte"],
        kilobyte: [8 * 1024 ** 2, "Kilobyte"],
        Kilobytes: [8 * 1024 ** 2, "Kilobyte"],
        kilobytes: [8 * 1024 ** 2, "Kilobyte"],

        MB: [8 * 1024 ** 2, "Megabyte"],
        Megabyte: [8 * 1024 ** 2, "Megabyte"],
        megabyte: [8 * 1024 ** 2, "Megabyte"],
        Megabytes: [8 * 1024 ** 2, "Megabyte"],
        megabytes: [8 * 1024 ** 2, "Megabyte"],

        GB: [8 * 1024 ** 3, "Gigabyte"],
        Gigabyte: [8 * 1024 ** 3, "Gigabyte"],
        gigabyte: [8 * 1024 ** 3, "Gigabyte"],
        Gigabytes: [8 * 1024 ** 3, "Gigabyte"],
        gigabytes: [8 * 1024 ** 3, "Gigabyte"],

        TB: [8 * 1024 ** 4, "Terabyte"],
        Terabytes: [8 * 1024 ** 4, "Terabyte"],
        Terabyte: [8 * 1024 ** 4, "Terabyte"],
        terabyte: [8 * 1024 ** 4, "Terabyte"],
        terabytes: [8 * 1024 ** 4, "Terabyte"],

        PB: [8 * 1024 ** 5, "Petabyte"],
        Petabytes: [8 * 1024 ** 5, "Petabyte"],
        Petabyte: [8 * 1024 ** 5, "Petabyte"],
        petabyte: [8 * 1024 ** 5, "Petabyte"],
        petabytes: [8 * 1024 ** 5, "Petabyte"],

        EB: [8 * 1024 ** 6, "Exabyte"],
        Exabytes: [8 * 1024 ** 6, "Exabyte"],
        Exabyte: [8 * 1024 ** 6, "Exabyte"],
        exabyte: [8 * 1024 ** 6, "Exabyte"],
        exabytes: [8 * 1024 ** 6, "Exabyte"],

        Kilo: [1024 ** 1, "Kilobyte"],
        Mega: [1024 ** 2, "Megabyte"],
        Giga: [1024 ** 3, "Gigabyte"],
        Tera: [1024 ** 4, "Terabyte"],
        Peta: [1024 ** 5, "Petabyte"],
        Exa: [1024 ** 6, "Exabyte"],
        kilo: [1024 ** 1, "Kilobyte"],
        mega: [1024 ** 2, "Megabyte"],
        giga: [1024 ** 3, "Gigabyte"],
        terra: [1024 ** 4, "Terabyte"],
        peta: [1024 ** 5, "Petabyte"],
        exa: [1024 ** 6, "Exabyte"],
        Kb: [1000 ** 1, "Kilobyte"],
        Kbit: [1000 ** 1, "Kilobyte"],
        Mb: [1000 ** 2, "Megabyte"],
        Mbit: [1000 ** 2, "Megabyte"],
        Gb: [1000 ** 3, "Gigabyte"],
        Gbit: [1000 ** 3, "Gigabyte"],
        Pb: [1000 ** 4, "Petabyte"],
        Pbit: [1000 ** 4, "Petabyte"],
        Eb: [1000 ** 5, "Exabyte"],
        Ebit: [1000 ** 5, "Exabyte"],
        Kibit: [2 ** 10, "Kilobyte"],
        Mibit: [2 ** 20, "Megabyte"],
        Gibit: [2 ** 30, "Gigabyte"],
        Tibit: [2 ** 40, "Terabyte"],
        Pibit: [2 ** 50, "Petabyte"],
        Eibit: [2 ** 60, "Exabyte"],
        Ki: [2 ** 10 / (8 * 8), "Kilobyte"],
        Mi: [2 ** 20 / (8 * 8), "Megabyte"],
        Gi: [2 ** 30 / (8 * 8), "Gigabyte"],
        Ti: [2 ** 40 / (8 * 8), "Terabyte"],
        Pi: [2 ** 50 / (8 * 8), "Petabyte"],
        Ex: [2 ** 60 / (8 * 8), "Exabyte"],
        kibibyte: [2 ** 10 / 8, "Kilobyte"],
        mebibyte: [2 ** 20 / 8, "Megabyte"],
        gibibyte: [2 ** 30 / 8, "Gigabyte"],
        tebibyte: [2 ** 40 / 8, "Terabyte"],
        pebobyte: [2 ** 50 / 8, "Petabyte"],
        exbibyte: [2 ** 60 / 8, "Exabyte"],
        KIB: [2 ** 10 / 8, "Kilobyte"],
        MEB: [2 ** 20 / 8, "Megabyte"],
        GIB: [2 ** 30 / 8, "Gigabyte"],
        TEB: [2 ** 40 / 8, "Terabyte"],
        PEB: [2 ** 50 / 8, "Petabyte"],
        EXB: [2 ** 60 / 8, "Exabyte"],
        MIB: [2 ** 20 / 8, "Megabyte"],
        TIB: [2 ** 40 / 8, "Terabyte"],
        PIB: [2 ** 50 / 8, "Petabyte"],
        EIB: [2 ** 60 / 8, "Exabyte"],
        KiB: [2 ** 10 / 8, "Kilobyte"],
        MeB: [2 ** 20 / 8, "Megabyte"],
        GiB: [2 ** 30 / 8, "Gigabyte"],
        TeB: [2 ** 40 / 8, "Terabyte"],
        PeB: [2 ** 50 / 8, "Petabyte"],
        ExB: [2 ** 60 / 8, "Exabyte"],
        MiB: [2 ** 20 / 8, "Megabyte"],
        TiB: [2 ** 40 / 8, "Terabyte"],
        PiB: [2 ** 50 / 8, "Petabyte"],
        EiB: [2 ** 60 / 8, "Exabyte"]
    };

    public value: number;
    public type = "string";
    public options = ["Byte", "Kilobyte", "Megabyte", "Gigabyte", "Terabyte", "Petabyte", "Exabyte"];
    public selected: StorageUnitSize;

    constructor(public token: string) {
        this.token = StorageUnitCategorisation.parse(token);
        this.value = StorageUnitCategorisation.units[this.token][0];
        this.selected = StorageUnitCategorisation.units[this.token][1];
    }

    public static parse(token: string) {
        token = token.trim();
        return Object.keys(StorageUnitCategorisation.units).find((i) => token == i) || "";
    }

    public static match(token: string): boolean {
        return StorageUnitCategorisation.parse(token) != "";
    }

    public static create(token: string): UnitCategorisation {
        return new StorageUnitCategorisation(token);
    }

    expand(prevUnit: UnitCategorisation | null): UnitCategorisation[] {
        if (prevUnit == null) {
            return [NumberUnitCategorisation.create("1"), this];
        }

        if (prevUnit instanceof StorageUnitCategorisation) {
            prevUnit.multiply(this.value);
            return [];
        }
        return [this];
    }

    multiply(factor: number) {
        this.value *= factor;
    }

    isCompatible(other: UnitCategorisation): boolean {
        return other instanceof StorageUnitCategorisation;
    }
}
