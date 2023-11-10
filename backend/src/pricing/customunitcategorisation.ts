import { UnitCategorisation } from "./units";

export class CustomUnitCategorisation implements UnitCategorisation {
    name: string = "CustomUnitCategorisation";

    private static table: { [name: string]: string } = {
        "use": "user",
        "acc": "account",
        "message": "message",
        "msg": "message",
        "api": "api",
        "unit": "unit",
        "bucket": "unit",
        "quan": "unit",
        "obj": "unit",
        "req": "request",
        "ev": "event",
        "noti": "notification",
        "op": "job",
        "operations": "job",
        "job": "job",
        "calc": "job",
        "pipe": "job",
        "tas": "job"
    };
    public value: string;

    constructor(public token: string) {
        this.value = CustomUnitCategorisation.parse(token);
    }

    private static parse(token: string) {
        token = token.trim().toLowerCase();
        let key = Object.keys(CustomUnitCategorisation.table).find(i => token.startsWith(i));
        if (!key) return "";
        return CustomUnitCategorisation.table[key];
    }

    public static match(token: string): boolean {
        return CustomUnitCategorisation.parse(token) != "";
    }

    public static create(token: string): UnitCategorisation {
        return new CustomUnitCategorisation(token);
    }
}