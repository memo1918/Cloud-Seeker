import { InputType, UnitCategorisation } from "./units";
import { isNil } from "lodash";

export class TimeUnitCategorisation implements UnitCategorisation {
    public name = "TimeUnitCategorisation";
    public token: string;
    public milliseconds: number;
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

    categorizeTime(token: string) {
        // Convert the token to lowercase for case-insensitivity
        const lowerToken = token.toLowerCase();

        // Check for each time unit and return the corresponding category
        for (const unit in TimeUnitCategorisation.patterns) {
            if (TimeUnitCategorisation.patterns[unit].test(lowerToken)) {
                return unit;
            }
        }

        // If no match is found, return null or handle it as needed
        throw new Error("Invalid time unit");
    }

    getFactor(token: string) {
        let factor: number = TimeUnitCategorisation.conversion[token];

        if (isNil(factor)) {
            throw new Error("Unsupported time unit");
        }

        return factor;
    }

    public static create(token: string): UnitCategorisation {
        return new TimeUnitCategorisation(token);
    }
}
