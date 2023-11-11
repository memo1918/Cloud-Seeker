export const csvTestDbFixtureData = [
    {
        name: "dump1",
        attributes: JSON.stringify({ a: "b", c: "d" }),
        prices: JSON.stringify({
            key: "value",
            otherKey: "otherValue"
        })
    },
    {
        name: "dump2",
        attributes: JSON.stringify({ a: "e", c: "f" }),
        prices: JSON.stringify({
            key: "value",
            otherKey: "otherValue"
        })
    },
    {
        name: "dump3",
        attributes: JSON.stringify({ a: "b", c: "d" }),
        prices: JSON.stringify({
            key: "value",
            otherKey: "otherValue"
        })
    },
    {
        name: "dump4witherror",
        attributes: JSON.stringify({ a: "b", c: "d" }).substring(2),
        prices: JSON.stringify({
            key: "value",
            otherKey: "otherValue"
        })
    }
];

export const transformedTestDbFixtureData = [
    {
        name: "dump1",
        attributes: { a: "b", c: "d" },
        prices: ["value", "otherValue"]
    },
    {
        name: "dump2",
        attributes: { a: "e", c: "f" },
        prices: ["value", "otherValue"]
    },
    {
        name: "dump3",
        attributes: { a: "b", c: "d" },
        prices: ["value", "otherValue"]
    }
];
