import { UnitCategorisation } from "./units";
import { DivisionUnitCategorisation } from "./divisionunitcategorisation";

export class Unit {
  constructor(
    public tokens: string[] = [],
    public categories: UnitCategorisation[] = []
  ) {
    this.expand();
  }

  private expand() {
    let prev: UnitCategorisation | null = null;
    for (let i = 0; i < this.categories.length; i++) {
      let current = this.categories[i];
      let expansion = current.expand(prev);
      this.categories.splice(i, 1, ...expansion);
      i += expansion.length - 1;
      prev = this.categories[i];
    }
  }

  public isCompatible(other: Unit): boolean {
    if (other.categories.length != this.categories.length) {
      return false;
    }
    for (let i = 0; i < this.categories.length; i++) {
      let thiselement = this.categories[i];
      let otherelement = other.categories[i];
      if (!thiselement.isCompatible(otherelement)) {
        return false;
      }
    }
    return true;
  }

  /**
   * gives a conversion factor for converting this unit into the target unit
   * this * conversionfactor = target -> factor = target/this
   * @param target
   */
  public getFactorForConversion(target: Unit) {
    if (!this.isCompatible(target))
      throw new Error(`Invalid conversion. Unit ${JSON.stringify(target)} is not compatible with ${JSON.stringify(this)}`);
    let factors = [1];
    for (let i = 0; i < this.categories.length; i++) {
      let thisCategorisation = this.categories[i];
      let targetCategorisation = target.categories[i];
      if (thisCategorisation instanceof DivisionUnitCategorisation && thisCategorisation.token == "-") {
        factors.push(1);
      }
      factors[factors.length - 1] *= thisCategorisation.getConversionFactor(targetCategorisation);
    }
    let factor = factors[0];

    if (factors.length > 1) {
      for (let i = 1; i < factors.length; i++) {
        factor /= factors[i];
      }
    }

    return factor;
  }

  public getUnitString() {
    return this.categories.map(c => c.getCategorisationString()).join(" ");
  }
}
