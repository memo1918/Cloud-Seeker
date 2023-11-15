import { InputType, UnitCategorisation } from "./units";
import { NumberUnitCategorisation } from "./numberunitcategorisation";
import { StorageUnitCategorisation } from "./storageunitcategorisation";
import { DivisionUnitCategorisation } from "./divisionunitcategorisation";
import { CustomUnitCategorisation } from "./customunitcategorisation";
import { DefaultUnitCategorisation } from "./defaultunitcategorisation";

export class TimeUnitCategorisation implements UnitCategorisation {
    unitName = "TimeUnitCategorisation";
    token: string;
    milliseconds: number;
    type: string = "number";
    options: any[] | null = ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"];
    acceptsUserInput: boolean = true;
    inputType: InputType = "dropdown";

    constructor(token: string) {
        this.token = TimeUnitCategorisation.getUnit(token) || "";
        this.milliseconds = TimeUnitCategorisation.conversion[this.token];
    }

    private static patterns: { [unit: string]: RegExp } = {
        millisecond: /^(m(illi)?(s(ec(ond(s)?)?)?))$/i,
        second: /^(s(ec(ond(s)?)?)?)$/i,
        minute: /^(m(in(ute)?)?(s)?)$/i,
        hour: /^(usage)?(h((ou)?r(s)?)?(ly)?|hr(s)?)$/i,
        day: /^(d(ay(s)?)?)$/i,
        week: /^(w(eek(s)?)?|wks)$/i,
        month: /^(m(o(nth(s)?(ly)?)?)?)$/i,
        year: /^(y(ear(s)?)?|yr(s)?)$/i
    };

    private static conversion: { [unit: string]: number } = {
        millisecond: 1,
        second: 1000,
        minute: 60 * 1000,
        hour: 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
        year: 365 * 24 * 60 * 60 * 1000
    };

    private static backConversion: { [unit: number]: string } = {
        1: "millisecond",
        1000: "second",
        60000: "minute",
        3600000: "hour",
        86400000: "day",
        604800000: "week",
        2592000000: "month",
        31536000000: "year"
    };

    public static getUnit(token: string): string | null {
        // normalise token
        token = token.toLowerCase().trim();

        // check if token is in the object
        for (const patternKey in this.patterns) {
            const pattern = this.patterns[patternKey];
            if (pattern.test(token)) {
                return patternKey;
            }
        }

        return null;
    }

    public static match(token: string): boolean {
        return TimeUnitCategorisation.getUnit(token) != null;
    }

    // categorizeTime(token: string) {
    //     // Convert the token to lowercase for case-insensitivity
    //     const lowerToken = token.toLowerCase();
    //
    //     // Check for each time unit and return the corresponding category
    //     for (const unit in TimeUnitCategorisation.patterns) {
    //         if (TimeUnitCategorisation.patterns[unit].test(lowerToken)) {
    //             return unit;
    //         }
    //     }
    //
    //     // If no match is found, return null or handle it as needed
    //     throw new Error("Invalid time unit");
    // }
    //
    // getFactor(token: string) {
    //     let factor: number = TimeUnitCategorisation.conversion[token];
    //
    //     if (isNil(factor)) {
    //         throw new Error("Unsupported time unit");
    //     }
    //
    //     return factor;
    // }

    public static create(token: string): UnitCategorisation {
        return new TimeUnitCategorisation(token);
    }

    expand(prevUnit: UnitCategorisation | null): UnitCategorisation[] {
        if (prevUnit == null) {
            return [NumberUnitCategorisation.create("1"), this];
        }
        if (prevUnit instanceof NumberUnitCategorisation) {
            return [this];
        }

        if (prevUnit instanceof DivisionUnitCategorisation) {
            return [NumberUnitCategorisation.create("1"), this];
        }

        if (
            prevUnit instanceof StorageUnitCategorisation ||
            prevUnit instanceof CustomUnitCategorisation ||
            prevUnit instanceof DefaultUnitCategorisation
        ) {
            return [DivisionUnitCategorisation.create("/"), NumberUnitCategorisation.create("1"), this];
        }
        return [NumberUnitCategorisation.create("1"), this];
    }

    isCompatible(other: UnitCategorisation): boolean {
        return other instanceof TimeUnitCategorisation;
    }
}
