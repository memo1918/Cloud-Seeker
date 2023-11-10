import { mySpecialFunction } from "./otherfn";

export class TestClass {
    getData() {
        return {
            "1": 2,
            "3": 4,
            "5": 6
        };
    }

    getDataFromCallback(callback: (data: any) => any) {
        return callback(this.getData());
    }

    getDataFromOtherModule() {
        return mySpecialFunction();
    }

    getDataFromOtherModule2() {
        return mySpecialFunction() == "Timo" ? "Allow" : "Deny";
    }
}
