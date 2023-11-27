import { UnitCategorisation } from "./units";
import { NumberUnitCategorisation } from "./numberunitcategorisation";

export class Unit {
    constructor(
        public tokens: string[] = [],
        public categories: UnitCategorisation[] = []
    ) {
        this.expand();
        let prevToken: UnitCategorisation;
        for (const token of this.categories) {
            // @ts-ignore
            if (token instanceof NumberUnitCategorisation && prevToken instanceof NumberUnitCategorisation) {
                console.log(this);
            }
            prevToken = token;
        }
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

    // public isCompatible(other: Unit): boolean {
    //     if (other.categories.length != this.categories.length) {
    //         return false;
    //     }
    //     for (let i = 0; i < this.categories.length; i++) {
    //         let thiselement = this.categories[i];
    //         let otherelement = this.categories[i];
    //         if (!thiselement.isCompatible(otherelement)) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }
}
