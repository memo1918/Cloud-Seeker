import { Attributes, Category, Instance, Price } from "../../src/mappingservice/interfaces";
import { ObjectId } from "mongodb";

export const SAMPLE_CATEGORY: Category = {
    name: "Compute",
    icon: "Computer",
    description: "test",
    vendors: [
        {
            name: "aws",
            columns: {
                cores: {
                    path: ["attributes", "vcpu"],
                    conversion: {}
                },
                memory: {
                    path: ["attributes", "memory"],
                    conversion: {}
                },
                regionCode: {
                    path: ["attributes", "regionCode"],
                    conversion: {}
                },
                storage: {
                    path: ["attributes", "storage"],
                    conversion: {}
                }
            }
        },
        {
            name: "gcp",
            columns: {}
        },
        {
            name: "azure",
            columns: {}
        }
    ],
    fields: [
        {
            name: "cores",
            options: [],
            unit: "Cores"
        },
        {
            name: "regionCode",
            options: [],
            unit: "text"
        },
        {
            name: "memory",
            options: [],
            unit: "GB"
        },
        {
            name: "storage",
            options: [],
            unit: "GB"
        }
    ],
    discovery: {
        aws: {
            key: ["productFamily"],
            value: ["Compute Instance"]
        },
        gcp: {
            key: ["productFamily"],
            value: ["Compute Instance"]
        },
        azure: {
            key: ["productFamily"],
            value: ["Compute"]
        }
    }
};

export const SAMPLE_SKUARR = [
    {
        _id: new ObjectId(),
        vendorName: "aws",
        sku: "1234567",
        prices: [
            {
                USD: "123",
                unit: "123"
            }
        ]
    },
    {
        _id: new ObjectId(),
        vendorName: "gcp",
        sku: "1234567",
        prices: [
            {
                USD: "123",
                unit: "123"
            }
        ]
    },
    {
        _id: new ObjectId(),
        vendorName: "azure",
        sku: "1234567",
        prices: [
            {
                USD: "123",
                unit: "123"
            }
        ]
    }
];

export const SAMPE_INSTANCE: Instance = {
    _id: new ObjectId("65438349cfbc77dfbf585c14"),
    productHash: "78d8fd3723016e85557930396667117b",
    sku: "74KCWBCF56NR8J8A",
    vendorName: "aws",
    region: "",
    service: "AmazonEC2",
    productFamily: "Compute Instance",
    attributes: {
        ecu: "39",
        vcpu: "8",
        memory: "16 GiB",
        storage: "1 x 200 NVMe SSD",
        tenancy: "Shared",
        location: "US East (New York City)",
        gpuMemory: "NA",
        operation: "RunInstances:0g00",
        usagetype: "NYC1-BoxUsage:c5d.2xlarge",
        clockSpeed: "3 GHz",
        regionCode: "us-east-1-nyc-1",
        servicecode: "AmazonEC2",
        servicename: "Amazon Elastic Compute Cloud",
        instanceType: "c5d.2xlarge",
        licenseModel: "No License required",
        locationType: "AWS Local Zone",
        marketoption: "OnDemand",
        capacitystatus: "Used",
        instanceFamily: "Compute optimized",
        preInstalledSw: "NA",
        operatingSystem: "Ubuntu Pro",
        availabilityzone: "NA",
        currentGeneration: "Yes",
        intelAvxAvailable: "Yes",
        physicalProcessor: "Intel Xeon Platinum 8124M",
        processorFeatures: "Intel AVX; Intel AVX2; Intel AVX512; Intel Turbo",
        intelAvx2Available: "Yes",
        networkPerformance: "Up to 10 Gigabit",
        intelTurboAvailable: "Yes",
        vpcnetworkingsupport: "true",
        processorArchitecture: "64-bit",
        dedicatedEbsThroughput: "Up to 2250 Mbps",
        normalizationSizeFactor: "16",
        classicnetworkingsupport: "false",
        enhancedNetworkingSupported: "Yes"
    },
    prices: [
        {
            USD: "0.4940000000",
            unit: "Hrs",
            priceHash: "78d8fd3723016e85557930396667117b-d2c98780d7b6e36641b521f1f8145c6f",
            description: "$0.494 per On Demand Ubuntu Pro c5d.2xlarge Instance Hour",
            endUsageAmount: "Inf",
            purchaseOption: "on_demand",
            startUsageAmount: "0",
            effectiveDateStart: "2023-09-01T00:00:00Z"
        } as Price
    ]
};

export const SAMPLE_ATTRIBUTES: Attributes = {
    cores: "8",
    memory: "16 GiB",
    regionCode: "us-east-1-nyc-1",
    storage: "1 x 200 NVMe SSD"
};
