import { Units } from "./units";
import * as _ from "lodash";
import { TestBed } from "@angular/core/testing";
import { getTestBedDeclarations, getTestBedImports } from "../testbed.app";

describe("units module", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
  });

    it("parsing unit for '1GB/Month'", () => {
        const unit = "1GB/Month";
        const result = Units.categorise(unit);
        expect(_.matches(["1", "GB", "/", "Month"])(result.tokens)).toBeTrue();
        expect(_.matches([
            { unitName: "NumberUnitCategorisation", value: 1 },
            {
                unitName: "StorageUnitCategorisation", value: 8589934592, selected: "Gigabyte"
            },
            { unitName: "DivisionUnitCategorisation", token: "/" },
            { unitName: "NumberUnitCategorisation", value: 1 },
            {
                unitName: "TimeUnitCategorisation", token: "month", milliseconds: 2592000000
            }
        ])(result.categories)).toBeTrue();
    });
    it("parsing unit for '1 Terabyte - 2 Month'", () => {
        const unit = "1 Terabyte - 2 Month";
        const result = Units.categorise(unit);
        expect(_.matches(["1", "Terabyte", "-", "2", "Month"])(result.tokens)).toBeTrue();
        expect(_.matches([
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({
                unitName: "StorageUnitCategorisation",
                value: 8796093022208,
                selected: "Terabyte"
            }),
            ({ unitName: "DivisionUnitCategorisation", token: "-" }),
            ({ unitName: "NumberUnitCategorisation", value: 2 }),
            ({
                unitName: "TimeUnitCategorisation",
                token: "month",
                milliseconds: 2592000000
            })
        ])(result.categories)).toBeTrue();
    });
    it("parsing unit for '1K Terabyte'", () => {
        const unit = "1K Terabyte";
        const result = Units.categorise(unit);
        expect(_.matches(["1", "K", "Terabyte"])(result.tokens)).toBeTrue();
        expect(_.matches([
            ({ unitName: "NumberUnitCategorisation", value: 1000 }),
            ({
                unitName: "StorageUnitCategorisation",
                value: 8796093022208,
                selected: "Terabyte"
            })
        ])(result.categories)).toBeTrue();
    });

    it("parsing unit for '1 M User per Year'", () => {
        const unit = "1 M User per Year";
        const result = Units.categorise(unit);
        expect(_.matches(["1", "M", "User", "per", "Year"])(result.tokens)).toBeTrue();
        expect(_.matches([
            ({ unitName: "NumberUnitCategorisation", value: 1_000_000 }),
            ({ unitName: "CustomUnitCategorisation", value: "user" }),
            ({ unitName: "DivisionUnitCategorisation", token: "per" }),
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({
                unitName: "TimeUnitCategorisation",
                token: "year",
                milliseconds: 31536000000
            })
        ])(result.categories)).toBeTrue();
    });
    it("parsing unit for '1 M UnknownEntity per Year'", () => {
        const unit = "1 M UnknownEntity per Year";
        const result = Units.categorise(unit);
        expect(_.matches(["1", "M", "Unknown", "Entity", "per", "Year"])(result.tokens)).toBeTrue();
        expect(_.matches([
            ({ unitName: "NumberUnitCategorisation", value: 1_000_000 }),
            ({ unitName: "DefaultUnitCategorisation", token: "Unknown Entity" }),
            ({ unitName: "DivisionUnitCategorisation", token: "per" }),
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({
                unitName: "TimeUnitCategorisation",
                token: "year",
                milliseconds: 31536000000
            })
        ])(result.categories)).toBeTrue(

        );
    });

    it("parsing unit for 'MemberUser'", () => {
        const unit = "MemberUser";
        const result = Units.categorise(unit);
        expect(_.matches(["Member", "User"])(result.tokens)).toBeTrue();
        expect(_.matches([
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({ unitName: "CustomUnitCategorisation", value: "user", token: "Member User" })
        ])(result.categories)).toBeTrue();
    });

    it("parsing unit for 'per Month'", () => {
        const unit = "per Month";
        const result = Units.categorise(unit);
        expect(_.matches(["per", "Month"])(result.tokens)).toBeTrue();
        expect(_.matches([
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({ unitName: "DivisionUnitCategorisation", token: "per" }),
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({
                unitName: "TimeUnitCategorisation",
                token: "month",
                milliseconds: 2592000000
            })
        ])(result.categories)).toBeTrue();
    });

    it("parsing unit for 'per / Month'", () => {
        const unit = "per / Month";
        const result = Units.categorise(unit);
        expect(_.matches(["per", "/", "Month"])(result.tokens)).toBeTrue();
        expect(_.matches([
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({ unitName: "DivisionUnitCategorisation", token: "per" }),
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({
                unitName: "TimeUnitCategorisation",
                token: "month",
                milliseconds: 2592000000
            })
        ])(result.categories)).toBeTrue();
    });
    it("parsing unit for '1 / sec'", () => {
        const unit = "1 / sec";
        const result = Units.categorise(unit);
        expect(_.matches(["1", "/", "sec"])(result.tokens)).toBeTrue();
        expect(_.matches([
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({ unitName: "DivisionUnitCategorisation", token: "/" }),
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({ unitName: "TimeUnitCategorisation", token: "second", milliseconds: 1000 })
        ])(result.categories)).toBeTrue(

        );
    });
    it("parsing unit for 'K / sec'", () => {
        const unit = "K / sec";
        const result = Units.categorise(unit);
        expect(_.matches(["K", "/", "sec"])(result.tokens)).toBeTrue();
        expect(_.matches([
            ({ unitName: "NumberUnitCategorisation", value: 1000 }),
            ({ unitName: "DivisionUnitCategorisation", token: "/" }),
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({ unitName: "TimeUnitCategorisation", token: "second", milliseconds: 1000 })
        ])(result.categories)).toBeTrue();
    });
    it("parsing unit for 'GB / sec'", () => {
        const unit = "GB / sec";
        const result = Units.categorise(unit);
        expect(_.matches(["GB", "/", "sec"])(result.tokens)).toBeTrue();
        expect(_.matches([
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({
                unitName: "StorageUnitCategorisation",
                value: 8589934592,
                selected: "Gigabyte"
            }),
            ({ unitName: "DivisionUnitCategorisation", token: "/" }),
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({ unitName: "TimeUnitCategorisation", token: "second", milliseconds: 1000 })
        ])(result.categories)).toBeTrue(

        );
    });
    it("parsing unit for 'GiB / sec'", () => {
        const unit = "GiB / sec";
        const result = Units.categorise(unit);
        expect(_.matches(["Gi", "B", "/", "sec"])(result.tokens)).toBeTrue();
        expect(_.matches([
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({
                unitName: "StorageUnitCategorisation",
                value: 134217728,
                selected: "Gigabyte"
            }),
            ({ unitName: "DivisionUnitCategorisation", token: "/" }),
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({ unitName: "TimeUnitCategorisation", token: "second", milliseconds: 1000 })
        ])(result.categories)).toBeTrue(

        );
    });
    it("parsing second time units", () => {
        let units = ["sec", "second", "s"];

        for (const unit of units) {
            const result = Units.categorise(unit);
            expect(_.matches([unit])(result.tokens)).toBeTrue();
            expect(_.matches([
                ({ unitName: "NumberUnitCategorisation", value: 1 }),
                ({ unitName: "TimeUnitCategorisation", token: "second", milliseconds: 1000 })
            ])(result.categories)).toBeTrue();
        }
    });

    it("parsing hour time units", () => {
        let units = ["h", "hour", "hours"];

        for (const unit of units) {
            const result = Units.categorise(unit);
            expect(_.matches([unit])(result.tokens)).toBeTrue();
            expect(_.matches([
                ({ unitName: "NumberUnitCategorisation", value: 1 }),
                ({
                    unitName: "TimeUnitCategorisation",
                    token: "hour",
                    milliseconds: 3600000
                })
            ])(result.categories)).toBeTrue();
        }
    });

    it("parsing millisecond time units", () => {
        let units = ["ms", "msec", "milliseconds", "millisecond"];

        for (const unit of units) {
            const result = Units.categorise(unit);
            expect(_.matches([unit])(result.tokens)).toEqual(true);
            expect(_.matches([
                ({ unitName: "NumberUnitCategorisation", value: 1 }),
                ({
                    unitName: "TimeUnitCategorisation",
                    token: "millisecond",
                    milliseconds: 1
                })
            ])(result.categories)).toEqual(
                true
            );
        }
    });

    it("parsing millisecond day units", () => {
        let units = ["d", "day", "days"];

        for (const unit of units) {
            const result = Units.categorise(unit);
            expect(_.matches([unit])(result.tokens)).toBeTrue();
            expect(_.matches([
                ({ unitName: "NumberUnitCategorisation", value: 1 }),
                ({
                    unitName: "TimeUnitCategorisation",
                    token: "day",
                    milliseconds: 86400000
                })
            ])(result.categories)).toBeTrue();
        }
    });

    it("parsing unit for 'GB sec'", () => {
        const unit = "GB sec";
        const result = Units.categorise(unit);
        expect(_.matches(["GB", "sec"])(result.tokens)).toBeTrue();
        expect(_.matches([
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({
                unitName: "StorageUnitCategorisation",
                value: 8589934592,
                selected: "Gigabyte"
            }),
            ({ unitName: "DivisionUnitCategorisation", token: "/" }),
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({ unitName: "TimeUnitCategorisation", token: "second", milliseconds: 1000 })
        ])(result.categories)).toBeTrue();
    });
    it("parsing unit for 'Unknown sec'", () => {
        const unit = "Unknown sec";
        const result = Units.categorise(unit);
        expect(_.matches(["Unknown", "sec"])(result.tokens)).toEqual(true);
        expect(_.matches([
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({ unitName: "DefaultUnitCategorisation", token: "Unknown" }),
            ({ unitName: "DivisionUnitCategorisation", token: "/" }),
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({ unitName: "TimeUnitCategorisation", token: "second", milliseconds: 1000 })
        ])(result.categories)).toEqual(
            true
        );
    });
    it("parsing unit for 'MiBps'", () => {
        const unit = "MiBps";
        const result = Units.categorise(unit);
        expect(_.matches(["MiB", "p", "s"])(result.tokens)).toEqual(true);
        expect(_.matches([
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({ unitName: "StorageUnitCategorisation", value: 131072, selected: "Megabyte" }),
            ({ unitName: "DivisionUnitCategorisation", token: "p" }),
            ({ unitName: "NumberUnitCategorisation", value: 1 }),
            ({ unitName: "TimeUnitCategorisation", token: "second", milliseconds: 1000 })
        ])(result.categories)).toEqual(
            true
        );
    });
});
