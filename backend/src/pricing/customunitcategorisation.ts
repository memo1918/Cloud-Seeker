import { InputType, UnitCategorisation } from "./units";

type CustomUnits =
    | "user"
    | "account"
    | "message"
    | "api"
    | "storageunit"
    | "request"
    | "job"
    | "rw"
    | "currency"
    | "configuration"
    | "ambiguous";

export class CustomUnitCategorisation implements UnitCategorisation {
    public name: string = "CustomUnitCategorisation";
    public options: any[] | null = null;
    public type: string = "string";
    public value: string;
    acceptsUserInput: boolean = false;
    inputType: InputType = null;

    private static table: { [name: string]: CustomUnits } = {
        use: "user",
        member: "user",
        play: "user",
        acc: "account",
        message: "message",
        msg: "message",
        api: "api",
        bucket: "storageunit",
        chunk: "storageunit",
        quan: "storageunit",
        obj: "storageunit",
        block: "storageunit",
        datapoint: "storageunit",
        record: "storageunit",
        bundle: "storageunit",
        item: "storageunit",
        shard: "storageunit",
        req: "request",
        queries: "request",
        query: "request",
        call: "request",
        ev: "request",
        noti: "request",
        op: "job",
        operations: "job",
        action: "job",
        job: "job",
        calc: "job",
        pipe: "job",
        tas: "job",
        invocations: "job",
        trigger: "job",
        executed: "job",
        run: "job",
        executions: "job",
        read: "rw",
        io: "rw",
        iop: "rw",
        write: "rw",
        rw: "rw",
        dollar: "currency",
        usd: "currency",
        eur: "currency",
        euro: "currency",
        config: "configuration",
        unit: "ambiguous",
        count: "ambiguous"
    };

    constructor(public token: string) {
        this.value = CustomUnitCategorisation.parse(token);
    }

    private static parse(token: string) {
        token = token.trim().toLowerCase();
        let key = Object.keys(CustomUnitCategorisation.table).find((i) => token.startsWith(i));
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
