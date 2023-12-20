import {createCartItemFromInstance, StorageCartItem} from "../models/cart-item";

export const StorageShoppingCartFixture: StorageCartItem[] = [
  {
    "providers": [{
      "providerName": "azure",
      "providerDefault": "1 hour",
      "configuration": "1 hour"
    }, {"providerName": "aws", "providerDefault": "1 hour", "configuration": "1 hour"}, {
      "providerName": "gcp",
      "providerDefault": "1 hour",
      "configuration": "1 hour"
    }],
    "selectedProvider": "gcp",
    "numberOfInstances": 1,
    "notes": "",
    "skus": ["DZH318Z096SR/Standard_E64s_v5/39c020f9-4583-544b-9488-af34c670b3c1", "FW8E5RQ44WYXEWXN", "generated-n2-highcpu-8"]
  },
  {
    "providers": [{
      "providerName": "azure",
      "providerDefault": "1 hour",
      "configuration": "1 hour"
    }, {"providerName": "aws", "providerDefault": "1 hour", "configuration": "1 hour"}, {
      "providerName": "gcp",
      "providerDefault": "1 Gigabyte / 1 hour",
      "configuration": "1 Gigabyte / 1 hour"
    }],
    "selectedProvider": "gcp",
    "numberOfInstances": 1,
    "notes": "",
    "skus": ["DZH318Z0CM2D/Standard_E20as_v4/00055bd0-12e3-51f0-aba3-e4da5d5948ca", "7ZDKQBZUNSGXYM7X", "3594-142D-9D31"]
  },
  {
    "providers": [{
      "providerName": "aws",
      "providerDefault": "1 Gigabyte - 1 month",
      "configuration": "1 Gigabyte - 1 month"
    }, {"providerName": "azure", "providerDefault": "10000", "configuration": "10000"}, {
      "providerName": "gcp",
      "providerDefault": "1 Gigabyte / 1 day",
      "configuration": "1 Gigabyte - 1 month"
    }],
    "selectedProvider": "aws",
    "numberOfInstances": 1,
    "notes": "",
    "skus": ["CRC8UP36GSCYTHBZ", "DZH318Z0BJRN/008Q/484b0f43-74f0-4ca3-bb6c-75f5a723f1ed", "02DA-7F03-3624"]
  },
  {
    "providers": [{
      "providerName": "azure",
      "providerDefault": "1 Gigabyte / 1 month",
      "configuration": "1 Gigabyte / 1 month"
    }, {
      "providerName": "aws",
      "providerDefault": "1 Gigabyte - 1 month",
      "configuration": "1 Gigabyte - 1 month"
    }, {"providerName": "gcp", "providerDefault": "1 count", "configuration": "1 count"}],
    "selectedProvider": "gcp",
    "numberOfInstances": 1,
    "notes": "",
    "skus": ["DZH318Z0BP0B/001P/c299f2a3-596e-4d5b-b05c-d23b635c0f5d", "SHZPVCYCE8T2DP4X", "007A-40B7-63BC"]
  }
]
export const ShoppingCartDummyItemsFixture = [
  {
    ...createCartItemFromInstance({
      "name": {"azure": "Virtual Machines", "aws": "AWSOutposts", "gcp": "Compute Engine"},
      "categoryName": "Compute",
      "price": {
        "azure": {"value": "0.51607", "unit": "1 Hour"},
        "aws": {"value": "1.4720000000", "unit": "Hrs"},
        "gcp": {"value": "0.076432", "unit": "Hours"}
      },
      "fields": {
        "cores": {"value": "32", "unit": ""},
        "memory": {"value": "256 GiB", "unit": ""},
        "regionCode": {"value": "us-east-2", "unit": ""},
        "operatingSystem": {"value": "Windows", "unit": ""},
        "storage": {"value": "EBS only", "unit": ""},
        "gpuMemory": {"value": "NA", "unit": ""},
        "clockSpeed": {"value": "NA", "unit": ""}
      },
      "skus": ["DZH318Z096SR/Standard_E64s_v5/39c020f9-4583-544b-9488-af34c670b3c1", "FW8E5RQ44WYXEWXN", "generated-n2-highcpu-8"]
    }),
    "pricingInformation": {
      "azure": {"factor": 720, "price": 371.5704},
      "aws": {"factor": 720, "price": 1059.84},
      "gcp": {"factor": 720, "price": 55.03104}
    }
  },
  {
    ...createCartItemFromInstance({
      "name": {"azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine"},
      "categoryName": "Compute",
      "price": {
        "azure": {"value": "0.348", "unit": "1 Hour"},
        "aws": {"value": "0.8500000000", "unit": "Hrs"},
        "gcp": {"value": "0.001720790", "unit": "gibibyte hour"}
      },
      "fields": {
        "cores": {"value": "8", "unit": ""},
        "gpuMemory": {"value": "NA", "unit": ""},
        "clockSpeed": {"value": "3.1 GHz", "unit": ""},
        "memory": {"value": "64 GiB", "unit": ""},
        "regionCode": {"value": "us-east-1-nyc-1", "unit": ""},
        "operatingSystem": {"value": "RHEL", "unit": ""},
        "storage": {"value": "1 x 300 NVMe SSD", "unit": ""}
      },
      "skus": ["DZH318Z0CM2D/Standard_E20as_v4/00055bd0-12e3-51f0-aba3-e4da5d5948ca", "7ZDKQBZUNSGXYM7X", "3594-142D-9D31"]
    }),
    "pricingInformation": {
      "azure": {"factor": 720, "price": 250.55999999999997},
      "aws": {"factor": 720, "price": 612},
      "gcp": {"factor": 46080, "price": 79.2940032}
    }
  },
  {
    ...createCartItemFromInstance({
      "name": {"aws": "AmazonS3", "azure": "Storage", "gcp": "Cloud Storage"},
      "categoryName": "Storage",
      "price": {
        "aws": {"value": "0.0036000000", "unit": "GB-Mo"},
        "azure": {"value": "0.03125", "unit": "10K"},
        "gcp": {"value": "0.000046660", "unit": "gibibyte day"}
      },
      "fields": {
        "regionCode": {"value": "us-east-1", "unit": ""},
        "storageClass": {"value": "Intelligent-Tiering", "unit": ""}
      },
      "skus": ["CRC8UP36GSCYTHBZ", "DZH318Z0BJRN/008Q/484b0f43-74f0-4ca3-bb6c-75f5a723f1ed", "02DA-7F03-3624"]
    }),
    "pricingInformation": {
      "aws": {"factor": 1, "price": 0.0036},
      "azure": {"factor": 1, "price": 0.03125},
      "gcp": {"factor": 1920, "price": 0.08958719999999999}
    }
  },
  {
    ...createCartItemFromInstance({
      "name": {"azure": "Storage", "aws": "AmazonSageMaker", "gcp": "Cloud Storage"},
      "categoryName": "Storage",
      "price": {
        "azure": {"value": "0.163", "unit": "1 GB/Month"},
        "aws": {"value": "0.1200000000", "unit": "GB-Mo"},
        "gcp": {"value": "0.000020000", "unit": "count"}
      },
      "fields": {
        "regionCode": {"value": "eu-central-2", "unit": ""},
        "storageClass": {"value": "NA", "unit": ""}
      },
      "skus": ["DZH318Z0BP0B/001P/c299f2a3-596e-4d5b-b05c-d23b635c0f5d", "SHZPVCYCE8T2DP4X", "007A-40B7-63BC"]
    }),
    "pricingInformation": {
      "azure": {"factor": 1, "price": 0.163},
      "aws": {"factor": 1, "price": 0.12},
      "gcp": {"factor": 1, "price": 0.00002}
    }
  }
];
