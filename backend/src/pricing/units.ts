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

    private units: { [hash: string]: Unit } = {};

    public async loadAllUnits() {
        let unitsByServiceFamily = await getDistinctUnitsGroupedByServiceFamily();
        let units = unitsByServiceFamily.flatMap(i => i.units);
        let tokens = units.map(i => (i.match(Units.regex) || []));
        tokens.forEach(i => this.categorise(i));
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
        ["Mi", "Bps"]
    ];

    private static computeTokenHash(tokens: string[]) {
        return tokens.map((v, i) => {
            return ("" + i + v + i);
        }).join("🪢");
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
        }


        this.units[Units.computeTokenHash(_originalTokens)] =
            new Unit(tokens, tokens.map(token => this.findUnitCategorisation(token, tokens)));

    }

    private static categorisations: [mapping: (token: string) => boolean, creation: (token: string) => UnitCategorisation][] = [
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
            message: `Did not find any unit for "${token}" ${JSON.stringify(tokens)}. Please check if this is intended.`,
            token,
            tokens,
            __filename
        });
        return DefaultUnitCategorisation.create(token);
    }

}