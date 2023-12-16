import { Unit } from "./unit";
import { TimeUnitCategorisation } from "./timeunitcategorisation";
import { NumberUnitCategorisation } from "./numberunitcategorisation";
import { DivisionUnitCategorisation } from "./divisionunitcategorisation";
import { StorageUnitCategorisation } from "./storageunitcategorisation";
import { ScalingUnitCategorisation } from "./scalingunitcategorisation";
import { DefaultUnitCategorisation } from "./defaultunitcategorisation";
import { CustomUnitCategorisation } from "./customunitcategorisation";

export type InputType = "input" | "dropdown" | null;

export interface UnitCategorisationData {
  unitName: string;
  token: string;
  type: string;
  options: null | string[];
  inputType: InputType;
  selected: null | string;
}

export interface UnitCategorisation extends UnitCategorisationData {
    expand(prevUnit: UnitCategorisation | null): UnitCategorisation[];
    isCompatible(other: UnitCategorisation): boolean;
    /**
     * gives a conversion factor for converting this unit into the target unit
     * this * conversionfactor = target -> factor = target/this
     * @param target
     */
    getConversionFactor(target: UnitCategorisation): number;

  getCategorisationString(): string;
}

export class Units {

    private static regex = /[0-9]+(?:\.[0-9]+)?|\/|-|([A-Z][a-z]+)|[A-Z]+(?![a-z])|[a-z]+[A-Z]|[a-z]+/g;

    private static joinElements: string[][] = [
        ["vC", "PU"],
        ["On", "Prem"],
        ["I", "Os"],
        ["UR", "Ls"],
        ["Mi", "Bps"],
        ["Linesof", "Code"],
        ["I", "/", "O"],
        ["sms", "-", "message"],
        ["IO", "Ps"],
        ["Gi", "Bps"]
    ];

    private static expandElements: [string, string[]][] = [
        ["MiBps", ["MiB", "p", "s"]],
        ["GiBps", ["GiB", "p", "s"]],
        ["PIOPS", ["IOp", "s"]],
        ["IOPS", ["IOp", "s"]],
        ["IOPs", ["IOp", "s"]],
        ["I/Os", ["IOs"]],
        ["Gbps", ["Gbit", "p", "s"]],
        ["MBPS", ["Mbit", "p", "s"]]
    ];


    public static categorise(unitText: string) {
        let tokens = unitText.match(Units.regex) || [];
        return this.categoriseTokens(tokens);
    }

    private static categoriseTokens(tokens: string[]) {
        let _originalTokens = [...tokens];

        for (let i = 0; i < tokens.length; i++) {
            tokenLoop: for (const joinElements of Units.joinElements) {
                for (let j = 0; j < joinElements.length; j++) {
                    if (tokens[i + j] != joinElements[j]) continue tokenLoop;
                }
                tokens[i] = joinElements.join("");
                tokens.splice(i + 1, joinElements.length - 1);
            }

            for (const expandElement of Units.expandElements) {
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

        return unit;
        // this.rawUnits[Units.computeTokenHash(_originalTokens)] = unit;
        // this.processedUnits[Units.computeTokenHash(tokens)] = unit;
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
    ];

    private static findUnitCategorisation(token: string, tokens: string[]): UnitCategorisation {
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
            tokens
        });
        return DefaultUnitCategorisation.create(token);
    }

}
