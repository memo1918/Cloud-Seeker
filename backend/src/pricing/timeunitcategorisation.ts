import { UnitCategorisation } from "./units";

export class TimeUnitCategorisation implements UnitCategorisation {
    public name = "TimeUnitCategorisation";
    public token: string;

    constructor(token: string) {
        this.token = TimeUnitCategorisation.getUnit(token) || "";
    }

    private static patterns: { [unit: string]: RegExp } = {
        s: /s(ec(ond(s)?)?)?/,
        min: /min(ute(s)?)?/,
        h: /h(our(s)?)?/,
        d: /d(ay(s)?)?/,
        w: /w(eek(s)?)?/,
        m: /mo(nth(s)?)?/,
        y: /y(ear(s)?)?/
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
        return this.getUnit(token) != null;
    }

    categorizeTime(token: string) {
        // Convert the token to lowercase for case-insensitivity
        const lowerToken = token.toLowerCase();

        // Define patterns for different time units
        const patterns: { [unit: string]: RegExp } = {
            s: /s(ec(ond(s)?)?)?/,
            min: /min(ute(s)?)?/,
            h: /h(our(s)?)?/,
            d: /d(ay(s)?)?/,
            w: /w(eek(s)?)?/,
            m: /mo(nth(s)?)?/,
            y: /y(ear(s)?)?/
        };

        // Check for each time unit and return the corresponding category
        for (const unit in patterns) {
            if (patterns[unit].test(lowerToken)) {
                return unit;
            }
        }

        // If no match is found, return null or handle it as needed
        throw new Error("Invalid time unit");
    }

    getFactor(token: string) {
        let factor: number;
        switch (token) {
            case "y":
                factor = 365 * 24 * 60 * 60; // years to seconds
                break;
            case "m":
                factor = 30 * 24 * 60 * 60; // months to seconds (approximating to 30 days per month)
                break;
            case "d":
                factor = 24 * 60 * 60; // days to seconds
                break;
            case "h":
                factor = 60 * 60; // hours to seconds
                break;
            case "min":
                factor = 60; // minutes to seconds
                break;
            case "s":
                factor = 1; // seconds (already in seconds)
                break;
            default:
                throw new Error("Unsupported time unit");
        }

        return factor;
    }

    // convert()
}