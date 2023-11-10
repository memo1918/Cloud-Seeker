import { UnitCategorisation } from "./units";
import { isNil } from "lodash";

export class TimeUnitCategorisation implements UnitCategorisation {
    public name = "TimeUnitCategorisation";
    public token: string;

    constructor(token: string) {
        this.token = TimeUnitCategorisation.getUnit(token) || "";
    }

    private static patterns: { [unit: string]: RegExp } = {
        s: /^(s(ec(ond(s)?)?)?)$/i,
        min: /^(m(in(ute)?)?(s)?)$/i,
        h: /^(h(our(s)?)?|Hrs)$/i,
        d: /^(d(ay(s)?)?)$/i,
        w: /^(w(eek(s)?)?|wks)$/i,
        m: /^(m(o(nth(s)?)?)?)$/i,
        y: /^(y(ear(s)?)?|yrs)$/i
    };

    private static conversion: { [unit: string]: number } = {
        s: 1,
        min: 60,
        h: 60 * 60,
        d: 24 * 60 * 60,
        w: 7 * 24 * 60 * 60,
        m: 30 * 24 * 60 * 60,
        y: 365 * 24 * 60 * 60
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