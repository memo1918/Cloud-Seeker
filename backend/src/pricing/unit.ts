import { UnitCategorisation } from "./units";

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
            i--;
            i += expansion.length;
            prev = this.categories[i];
        }
    }

    public isCompatible(other: Unit): boolean {
        if (other.categories.length != this.categories.length) {
            return false;
        }
        for (let i = 0; i < this.categories.length; i++) {
            let thiselement = this.categories[i];
            let otherelement = this.categories[i];
            if (!thiselement.isCompatible(otherelement)) {
                return false;
            }
        }
        return true;
    }
}
