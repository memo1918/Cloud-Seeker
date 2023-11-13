import { getDistinctUnitsGroupedByServiceFamily } from "../layer/services";
import { Unit } from "./unit";
import { TimeUnitCategorisation } from "./timeunitcategorisation";
import { NumberUnitCategorisation } from "./numberunitcategorisation";
import { DivisionUnitCategorisation } from "./divisionunitcategorisation";
import { StorageUnitCategorisation } from "./storageunitcategorisation";
import { ScalingUnitCategorisation } from "./scalingunitcategorisation";
import { DefaultUnitCategorisation } from "./defaultunitcategorisation";
import { CustomUnitCategorisation } from "./customunitcategorisation";

export interface UnitCategorisation {
    name: string;
    token: string;
}

export class Units {
    private constructor() {
        this.loadAllUnits();
    }

    private static instance: Units;

    public static getInstance(): Units {
        if (!Units.instance) {
            Units.instance = new Units();
        }
        return Units.instance;
    }

    private static regex = /[0-9]+(?:\.[0-9]+)?|\/|-|([A-Z][a-z]+)|[A-Z]+(?![a-z])|[a-z]+[A-Z]|[a-z]+/g;

    private rawUnits: { [hash: string]: Unit } = {};
    private processedUnits: { [hash: string]: Unit } = {};

    public async loadAllUnits() {
        let unitsByServiceFamily = await getDistinctUnitsGroupedByServiceFamily();
        let units = unitsByServiceFamily.flatMap((i) => i.units);
        let tokens = units.map((i) => i.match(Units.regex) || []);
        tokens.forEach((i) => this.categorise(i));
        // this.units.push(...tokens.map(i => this.categorise(i)));
        console.log({
            message: `loaded all units completely`,
            __filename
        });
    }

    private joinElements: [string, string][] = [
        ["vC", "PU"],
        ["On", "Prem"],
        ["I", "Os"],
        ["UR", "Ls"],
        ["Mi", "Bps"],
        ["Linesof", "Code"],
        ["I", "/"],
        ["I/", "O"],
        ["IO", "Ps"],
        ["Gi", "Bps"]
    ];

    private expandElements: [string, string[]][] = [
        ["MiBps", ["MiB", "p", "s"]],
        ["GiBps", ["GiB", "p", "s"]],
        ["PIOPS", ["IOp", "s"]],
        ["IOPS", ["IOp", "s"]],
        ["IOPs", ["IOp", "s"]],
        ["I/Os", ["IOs"]],
        ["Gbps", ["Gbit", "p", "s"]],
        ["MBPS", ["Mbit", "p", "s"]]
    ];

    private static computeTokenHash(tokens: string[]) {
        return tokens
            .map((v, i) => {
                return "" + i + v + i;
            })
            .join("🪢");
    }

    public categorise(tokens: string[]) {
        let _originalTokens = [...tokens];

        for (let i = 0; i < tokens.length; i++) {
            for (const joinElement of this.joinElements) {
                if (tokens[i] != joinElement[0]) {
                    continue;
                }
                if (tokens[i + 1] != joinElement[1]) {
                    continue;
                }
                tokens[i] = tokens[i] + tokens[i + 1];
                tokens.splice(i + 1, 1);
            }

            for (const expandElement of this.expandElements) {
                if (tokens[i] != expandElement[0]) {
                    continue;
                }
                tokens.splice(i, 1, ...expandElement[1]);
            }
        }

        const unit = new Unit(
            tokens,
            tokens.map((token) => this.findUnitCategorisation(token, tokens))
        );
        this.rawUnits[Units.computeTokenHash(_originalTokens)] = unit;
        this.processedUnits[Units.computeTokenHash(tokens)] = unit;
    }

    private static categorisations: [
        mapping: (token: string) => boolean,
        creation: (token: string) => UnitCategorisation
    ][] = [
        [ScalingUnitCategorisation.match, ScalingUnitCategorisation.create],
        [StorageUnitCategorisation.match, StorageUnitCategorisation.create],
        [TimeUnitCategorisation.match, TimeUnitCategorisation.create],
        [NumberUnitCategorisation.match, NumberUnitCategorisation.create],
        [DivisionUnitCategorisation.match, DivisionUnitCategorisation.create],
        [CustomUnitCategorisation.match, CustomUnitCategorisation.create]
        // [DefaultUnitCategorisation.match, DefaultUnitCategorisation.create]
    ];

    public findUnitCategorisation(token: string, tokens: string[]): UnitCategorisation {
        for (const categorisation of Units.categorisations) {
            const [mapping, creation] = categorisation;
            if (mapping(token)) {
                return creation(token);
            }
        }
        console.log({
            message: `Did not find any unit for "${token}" ${JSON.stringify(
                tokens
            )}. Please check if this is intended.`,
            token,
            tokens,
            __filename
        });
        return DefaultUnitCategorisation.create(token);
    }

    public getUnits() {
        return Object.values(this.processedUnits);
    }
}
