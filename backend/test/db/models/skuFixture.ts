export const skuFixture = [
    {
        sku: "instance1",
        productFamily: "serviceGroup1",
        prices: [{ unit: "unit1" }, { unit: "unit2" }, { unit: "unit1" }]
    },
    {
        sku: "instance2",
        productFamily: "serviceGroup1",
        prices: [{ unit: "unit1" }, { unit: "unit3" }]
    },
    {
        sku: "instance3",
        productFamily: "serviceGroup2",
        prices: [{ unit: "unit1" }, { unit: "unit4" }]
    }
];

export const distinctSkus = [
    {
        _id: "serviceGroup1",
        units: ["unit1", "unit2", "unit3"]
    },
    {
        _id: "serviceGroup2",
        units: ["unit1", "unit4"]
    }
];
