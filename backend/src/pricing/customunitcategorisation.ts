import { InputType, UnitCategorisation } from "./units";
import { NumberUnitCategorisation } from "./numberunitcategorisation";

type CustomUnits =
    | "user"
    | "account"
    | "message"
    | "storageunit"
    | "request"
    | "job"
    | "rw"
    | "currency"
    | "configuration"
    | "ambiguous"
    | "classification";

export class CustomUnitCategorisation implements UnitCategorisation {
    public unitName: string = "CustomUnitCategorisation";
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
        sms: "message",
        msg: "message",
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
        api: "request",
        ev: "request",
        noti: "request",
        op: "job",
        operations: "job",
        action: "job",
        job: "job",
        calc: "job",
        pipe: "job",
        lambda: "job",
        tas: "job",
        invocations: "job",
        trigger: "job",
        executed: "job",
        comput: "job",
        run: "job",
        executions: "job",
        transaction: "job",
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
        count: "ambiguous",
        prediction: "job"
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

    expand(prevUnit: UnitCategorisation | null): UnitCategorisation[] {
        if (prevUnit != null && prevUnit instanceof CustomUnitCategorisation && prevUnit.value == this.value) {
            prevUnit.token = `${prevUnit.token} ${this.token}`;
            return [];
        }

        if (prevUnit != null && prevUnit instanceof NumberUnitCategorisation) {
            return [this];
        }
        return [NumberUnitCategorisation.create("1"), this];
    }

    isCompatible(other: UnitCategorisation): boolean {
        if (!(other instanceof CustomUnitCategorisation)) {
            return false;
        }
        return other.value == this.value;
    }
}
