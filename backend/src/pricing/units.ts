import { getDistinctUnitsGroupedByServiceFamily } from "../layer/services";
import { Unit } from "./unit";
import { TimeUnitCategorisation } from "./timeunitcategorisation";
import { NumberUnitCategorisation } from "./numberunitcategorisation";
import { DivisionUnitCategorisation } from "./divisionunitcategorisation";

export interface UnitCategorisation {
    name: string;
    token: string;
}


export class Units {

    private static regex = /[0-9]+(?:\.[0-9]+)?|\/|-|([A-Z][a-z]+)|[A-Z]+(?![a-z])|[a-z]+[A-Z]|[a-z]+/g;

    private tokens: string[][] = [];
    private units: Unit[] = [];

    public async loadAllUnits() {
        let unitsByServiceFamily = await getDistinctUnitsGroupedByServiceFamily();
        let units = unitsByServiceFamily.flatMap(i => i.units);
        this.tokens.push(...units.map(i => (i.match(Units.regex) || [])));
        this.units.push(...this.tokens.map(i => this.categorise(i)));
        console.log(this);
    }

    public categorise(tokens: string[]): Unit {
        return new Unit(tokens, tokens.map(token => this.findUnitCategorisation(token)));
    }

    public findUnitCategorisation(token: string): UnitCategorisation {
        let unit: UnitCategorisation[] = [];

        if (TimeUnitCategorisation.match(token)) {
            unit.push(new TimeUnitCategorisation(token));
        }

        if (NumberUnitCategorisation.match(token)) {
            unit.push(new NumberUnitCategorisation(token));
        }

        if (DivisionUnitCategorisation.match(token)) {
            unit.push(new DivisionUnitCategorisation(token));
        }

        if (unit.length > 1) {
            console.error(`Multiple units found for ->${token}<-`);
        }

        if (unit.length == 0) {
            console.error(`No units found for ->${token}<-`);
        }
        return unit[0];
    }

}