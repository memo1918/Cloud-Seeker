import { InputType, UnitCategorisation } from "./units";
import { NumberUnitCategorisation } from "./numberunitcategorisation";

export class DivisionUnitCategorisation implements UnitCategorisation {
  unitName: string = "DivisionUnitCategorisation";
  options: any[] | null = null;
  type: string = "division";
  acceptsUserInput: boolean = false;
  inputType: InputType = null;
  selected = null;

  constructor(public token: string) {
  }

  public static match(token: string): boolean {
    // normalise token
    token = token.trim().toLowerCase();

    return token == "/" || token == "\\" || token == "-" || token == "per" || token == "p";
  }

  public static create(token: string): UnitCategorisation {
    return new DivisionUnitCategorisation(token);
  }

  expand(prevUnit: UnitCategorisation | null): UnitCategorisation[] {
    if (prevUnit == null) {
      return [NumberUnitCategorisation.create("1"), this];
    }
    if (prevUnit instanceof DivisionUnitCategorisation) {
      return [];
    }
    if (prevUnit instanceof NumberUnitCategorisation) {
      return [this];
    }
    return [this];
  }

  isCompatible(other: UnitCategorisation): boolean {
    if (!(other instanceof DivisionUnitCategorisation)) return false;
    if (this.token == "-") {
      return this.token == other.token;
    }
    return true;
  }

  getConversionFactor(other: UnitCategorisation): number {
    return 1;
  }

  getCategorisationString(): string {
    return this.token;
  }
}
