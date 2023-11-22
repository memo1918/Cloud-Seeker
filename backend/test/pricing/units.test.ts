import { describe, expect, test } from "@jest/globals";
import { Units } from "../../src/pricing/units";

describe("units module", () => {
    test("parsing unit for '1GB/Month'", () => {
        const unit = "1GB/Month";
        const result = Units.categorise(unit);
        expect(result.tokens).toEqual(expect.arrayContaining(["1", "GB", "/", "Month"]));
        expect(result.categories).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({
                    unitName: "StorageUnitCategorisation",
                    value: 8589934592,
                    selected: "Gigabyte"
                }),
                expect.objectContaining({ unitName: "DivisionUnitCategorisation", token: "/" }),
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({
                    unitName: "TimeUnitCategorisation",
                    token: "month",
                    milliseconds: 2592000000
                })
            ])
        );
    });
    test("parsing unit for '1 Terabyte - 2 Month'", () => {
        const unit = "1 Terabyte - 2 Month";
        const result = Units.categorise(unit);
        expect(result.tokens).toEqual(expect.arrayContaining(["1", "Terabyte", "-", "2", "Month"]));
        expect(result.categories).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({
                    unitName: "StorageUnitCategorisation",
                    value: 8796093022208,
                    selected: "Terabyte"
                }),
                expect.objectContaining({ unitName: "DivisionUnitCategorisation", token: "-" }),
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 2 }),
                expect.objectContaining({
                    unitName: "TimeUnitCategorisation",
                    token: "month",
                    milliseconds: 2592000000
                })
            ])
        );
    });
    test("parsing unit for '1K Terabyte'", () => {
        const unit = "1K Terabyte";
        const result = Units.categorise(unit);
        expect(result.tokens).toEqual(expect.arrayContaining(["1", "K", "Terabyte"]));
        expect(result.categories).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1000 }),
                expect.objectContaining({
                    unitName: "StorageUnitCategorisation",
                    value: 8796093022208,
                    selected: "Terabyte"
                })
            ])
        );
    });

    test("parsing unit for '1 M User per Year'", () => {
        const unit = "1 M User per Year";
        const result = Units.categorise(unit);
        expect(result.tokens).toEqual(expect.arrayContaining(["1", "M", "User", "per", "Year"]));
        expect(result.categories).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1_000_000 }),
                expect.objectContaining({ unitName: "CustomUnitCategorisation", value: "user" }),
                expect.objectContaining({ unitName: "DivisionUnitCategorisation", token: "per" }),
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({
                    unitName: "TimeUnitCategorisation",
                    token: "year",
                    milliseconds: 31536000000
                })
            ])
        );
    });
    test("parsing unit for '1 M UnknownEntity per Year'", () => {
        const unit = "1 M UnknownEntity per Year";
        const result = Units.categorise(unit);
        expect(result.tokens).toEqual(expect.arrayContaining(["1", "M", "Unknown", "Entity", "per", "Year"]));
        expect(result.categories).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1_000_000 }),
                expect.objectContaining({ unitName: "DefaultUnitCategorisation", token: "Unknown Entity" }),
                expect.objectContaining({ unitName: "DivisionUnitCategorisation", token: "per" }),
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({
                    unitName: "TimeUnitCategorisation",
                    token: "year",
                    milliseconds: 31536000000
                })
            ])
        );
    });

    test("parsing unit for 'MemberUser'", () => {
        const unit = "MemberUser";
        const result = Units.categorise(unit);
        expect(result.tokens).toEqual(expect.arrayContaining(["Member", "User"]));
        expect(result.categories).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ unitName: "CustomUnitCategorisation", value: "user", token: "Member User" })
            ])
        );
    });

    test("parsing unit for 'per Month'", () => {
        const unit = "per Month";
        const result = Units.categorise(unit);
        expect(result.tokens).toEqual(expect.arrayContaining(["per", "Month"]));
        expect(result.categories).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({ unitName: "DivisionUnitCategorisation", token: "per" }),
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({
                    unitName: "TimeUnitCategorisation",
                    token: "month",
                    milliseconds: 2592000000
                })
            ])
        );
    });

    test("parsing unit for 'per / Month'", () => {
        const unit = "per / Month";
        const result = Units.categorise(unit);
        expect(result.tokens).toEqual(expect.arrayContaining(["per", "/", "Month"]));
        expect(result.categories).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({ unitName: "DivisionUnitCategorisation", token: "per" }),
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({
                    unitName: "TimeUnitCategorisation",
                    token: "month",
                    milliseconds: 2592000000
                })
            ])
        );
    });
    test("parsing unit for '1 / sec'", () => {
        const unit = "1 / sec";
        const result = Units.categorise(unit);
        expect(result.tokens).toEqual(expect.arrayContaining(["1", "/", "sec"]));
        expect(result.categories).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({ unitName: "DivisionUnitCategorisation", token: "/" }),
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({ unitName: "TimeUnitCategorisation", token: "second", milliseconds: 1000 })
            ])
        );
    });
    test("parsing unit for 'K / sec'", () => {
        const unit = "K / sec";
        const result = Units.categorise(unit);
        expect(result.tokens).toEqual(expect.arrayContaining(["K", "/", "sec"]));
        expect(result.categories).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1000 }),
                expect.objectContaining({ unitName: "DivisionUnitCategorisation", token: "/" }),
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({ unitName: "TimeUnitCategorisation", token: "second", milliseconds: 1000 })
            ])
        );
    });
    test("parsing unit for 'GB / sec'", () => {
        const unit = "GB / sec";
        const result = Units.categorise(unit);
        expect(result.tokens).toEqual(expect.arrayContaining(["GB", "/", "sec"]));
        expect(result.categories).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({
                    unitName: "StorageUnitCategorisation",
                    value: 8589934592,
                    selected: "Gigabyte"
                }),
                expect.objectContaining({ unitName: "DivisionUnitCategorisation", token: "/" }),
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({ unitName: "TimeUnitCategorisation", token: "second", milliseconds: 1000 })
            ])
        );
    });
    test("parsing unit for 'GiB / sec'", () => {
        const unit = "GiB / sec";
        const result = Units.categorise(unit);
        expect(result.tokens).toEqual(expect.arrayContaining(["Gi", "B", "/", "sec"]));
        expect(result.categories).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({
                    unitName: "StorageUnitCategorisation",
                    value: 134217728,
                    selected: "Gigabyte"
                }),
                expect.objectContaining({ unitName: "DivisionUnitCategorisation", token: "/" }),
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({ unitName: "TimeUnitCategorisation", token: "second", milliseconds: 1000 })
            ])
        );
    });
    test("parsing second time units", () => {
        let units = ["sec", "second", "s"];

        for (const unit of units) {
            const result = Units.categorise(unit);
            expect(result.tokens).toEqual(expect.arrayContaining([unit]));
            expect(result.categories).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                    expect.objectContaining({ unitName: "TimeUnitCategorisation", token: "second", milliseconds: 1000 })
                ])
            );
        }
    });

    test("parsing hour time units", () => {
        let units = ["h", "hour", "hours"];

        for (const unit of units) {
            const result = Units.categorise(unit);
            expect(result.tokens).toEqual(expect.arrayContaining([unit]));
            expect(result.categories).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                    expect.objectContaining({
                        unitName: "TimeUnitCategorisation",
                        token: "hour",
                        milliseconds: 3600000
                    })
                ])
            );
        }
    });

    test("parsing millisecond time units", () => {
        let units = ["ms", "msec", "milliseconds", "millisecond"];

        for (const unit of units) {
            const result = Units.categorise(unit);
            expect(result.tokens).toEqual(expect.arrayContaining([unit]));
            expect(result.categories).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                    expect.objectContaining({
                        unitName: "TimeUnitCategorisation",
                        token: "millisecond",
                        milliseconds: 1
                    })
                ])
            );
        }
    });

    test("parsing millisecond day units", () => {
        let units = ["d", "day", "days"];

        for (const unit of units) {
            const result = Units.categorise(unit);
            expect(result.tokens).toEqual(expect.arrayContaining([unit]));
            expect(result.categories).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                    expect.objectContaining({
                        unitName: "TimeUnitCategorisation",
                        token: "day",
                        milliseconds: 86400000
                    })
                ])
            );
        }
    });

    test("parsing unit for 'GB sec'", () => {
        const unit = "GB sec";
        const result = Units.categorise(unit);
        expect(result.tokens).toEqual(expect.arrayContaining(["GB", "sec"]));
        expect(result.categories).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({
                    unitName: "StorageUnitCategorisation",
                    value: 8589934592,
                    selected: "Gigabyte"
                }),
                expect.objectContaining({ unitName: "DivisionUnitCategorisation", token: "/" }),
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({ unitName: "TimeUnitCategorisation", token: "second", milliseconds: 1000 })
            ])
        );
    });
    test("parsing unit for 'Unknown sec'", () => {
        const unit = "Unknown sec";
        const result = Units.categorise(unit);
        expect(result.tokens).toEqual(expect.arrayContaining(["Unknown", "sec"]));
        expect(result.categories).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({ unitName: "DefaultUnitCategorisation", token: "Unknown" }),
                expect.objectContaining({ unitName: "DivisionUnitCategorisation", token: "/" }),
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({ unitName: "TimeUnitCategorisation", token: "second", milliseconds: 1000 })
            ])
        );
    });
    test("parsing unit for 'MiBps'", () => {
        const unit = "MiBps";
        const result = Units.categorise(unit);
        expect(result.tokens).toEqual(expect.arrayContaining(["MiB", "p", "s"]));
        expect(result.categories).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({ unitName: "StorageUnitCategorisation", value: 131072, selected: "Megabyte" }),
                expect.objectContaining({ unitName: "DivisionUnitCategorisation", token: "p" }),
                expect.objectContaining({ unitName: "NumberUnitCategorisation", value: 1 }),
                expect.objectContaining({ unitName: "TimeUnitCategorisation", token: "second", milliseconds: 1000 })
            ])
        );
    });
});
