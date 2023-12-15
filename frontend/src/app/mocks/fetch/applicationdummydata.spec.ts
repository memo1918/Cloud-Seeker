import { ResponseMappings } from "../../fetch.mock.spec";

export const dummyApplicationData: ResponseMappings = {
  "/api/categories": [JSON.stringify({
    "data": {
      "categories": [{
        "_id": "65661f1e89c8a1f1865387f1",
        "name": "Compute",
        "icon": "computer",
        "description": "test",
        "vendors": [{
          "name": "aws",
          "columns": {
            "cores": { "path": ["attributes", "vcpu"], "conversion": {} },
            "gpuMemory": { "path": ["attributes", "gpuMemory"], "conversion": {} },
            "clockSpeed": { "path": ["attributes", "clockSpeed"], "conversion": {} },
            "memory": { "path": ["attributes", "memory"], "conversion": {} },
            "regionCode": { "path": ["attributes", "regionCode"], "conversion": {} },
            "operatingSystem": { "path": ["attributes", "operatingSystem"], "conversion": {} },
            "storage": { "path": ["attributes", "storage"], "conversion": {} }
          }
        }, { "name": "gcp", "columns": {} }, { "name": "azure", "columns": {} }],
        "fields": [{
          "name": "cores",
          "options": ["1", "12", "128", "16", "192", "2", "32", "4", "48", "8"],
          "unit": "Cores",
          "type": "number"
        }, {
          "name": "regionCode",
          "options": ["ap-northeast-3", "eu-central-2", "eu-south-1", "eu-west-3", "us-east-1", "us-east-1-nyc-1", "us-east-2", "us-gov-east-1", "us-gov-west-1", "us-west-2", "us-west-2-den-1"],
          "unit": "",
          "type": "dropdown"
        }, { "name": "gpuMemory", "options": ["NA"], "unit": "", "type": "dropdown" }, {
          "name": "clockSpeed",
          "options": ["2.3 GHz", "2.4 GHz", "2.5 GHz", "2.95 GHz", "3 GHz", "3.1 GHz", "3.5 GHz", "4 GHz"],
          "unit": "",
          "type": "number"
        }, {
          "name": "operatingSystem",
          "options": ["Linux", "RHEL", "Red Hat Enterprise Linux with HA", "Ubuntu Pro", "Windows"],
          "unit": "",
          "type": "dropdown"
        }, {
          "name": "memory",
          "options": ["128 GiB", "15.25 GiB", "16 GiB", "192 GiB", "2048 GiB", "256 GiB", "30 GiB", "30.5 GiB", "32 GiB", "384 GiB", "4 GiB", "61 GiB", "64 GiB", "8 GiB", "96 GiB"],
          "unit": "",
          "type": "number"
        }, {
          "name": "storage",
          "options": ["1 x 150 NVMe SSD", "1 x 1900 SSD", "1 x 237 NVMe SSD", "1 x 300 NVMe SSD", "1 x 450 NVMe SSD", "1 x 59 SSD", "2 x 1900 NVMe SSD", "2 x 80 SSD", "2 x 900 NVMe SSD", "6 x 2000 HDD", "EBS only"],
          "unit": "",
          "type": "dropdown"
        }],
        "discovery": {
          "aws": { "key": ["productFamily"], "value": ["Compute Instance"] },
          "gcp": { "key": ["productFamily"], "value": ["Compute Instance"] },
          "azure": { "key": ["productFamily"], "value": ["Compute"] }
        }
      }, {
        "_id": "65661f1e89c8a1f1865387f2",
        "name": "Storage",
        "icon": "storage",
        "description": "test",
        "vendors": [{
          "name": "aws",
          "columns": {
            "regionCode": { "path": ["attributes", "regionCode"], "conversion": {} },
            "storageClass": { "path": ["attributes", "storageClass"], "conversion": {} }
          }
        }, { "name": "gcp", "columns": {} }, { "name": "azure", "columns": {} }],
        "fields": [{
          "name": "regionCode",
          "options": ["af-south-1", "ap-south-1", "ap-southeast-1-bkk-1", "eu-central-1", "eu-central-2", "eu-south-2", "eu-west-1", "eu-west-3", "me-central-1", "me-south-1", "us-east-1", "us-east-1-wl1-dfw1", "us-east-2", "us-gov-west-1", "us-west-1"],
          "unit": "text",
          "type": "dropdown"
        }, {
          "name": "storageClass",
          "options": ["Archive", "General Purpose", "Infrequent Access", "Intelligent-Tiering", "Non-Critical Data", "One Zone-Infrequent Access"],
          "unit": "text",
          "type": "dropdown"
        }],
        "discovery": {
          "aws": { "key": ["productFamily"], "value": ["Storage"] },
          "gcp": { "key": ["productFamily"], "value": ["Storage"] },
          "azure": { "key": ["productFamily"], "value": ["Storage"] }
        }
      }, {
        "_id": "65661f1e89c8a1f1865387f3",
        "name": "Relational Database",
        "icon": "save",
        "description": "test",
        "vendors": [{
          "name": "aws",
          "columns": {
            "cores": { "path": ["attributes", "vcpu"], "conversion": {} },
            "memory": { "path": ["attributes", "memory"], "conversion": {} },
            "storage": { "path": ["attributes", "storage"], "conversion": {} },
            "location": { "path": ["attributes", "location"], "conversion": {} }
          }
        }, { "name": "gcp", "columns": {} }, { "name": "azure", "columns": {} }],
        "fields": [{ "name": "cores", "options": ["2", "96"], "unit": "Cores", "type": "number" }, {
          "name": "memory",
          "options": ["16 GiB", "768 GiB"],
          "unit": "GB",
          "type": "number"
        }, { "name": "storage", "options": ["EBS Only"], "unit": "GB", "type": "dropdown" }, {
          "name": "location",
          "options": ["Europe (Spain)", "US East (N. Virginia)"],
          "unit": "",
          "type": "dropdown"
        }],
        "discovery": {
          "aws": { "key": ["service"], "value": ["AmazonRDS"] },
          "gcp": { "key": ["service"], "value": ["Cloud SQL"] },
          "azure": { "key": ["productFamily"], "value": ["Databases"] }
        }
      }]
    }
  }), { status: 200, statusText: "OK" }],
  "/api/": [JSON.stringify({ "data": { "visitors": 138 } }), { status: 200, statusText: "OK" }],
  "/api/categories/instancecomparisons?categoryname=Compute": [JSON.stringify({
    "data": {
      "InstanceComparisons": [{
        "_id": "65661f1d89c8a1f1865387c6",
        "name": { "azure": "Virtual Machines", "aws": "AWSOutposts", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.51607", "unit": "1 Hour" },
          "aws": { "value": "1.4720000000", "unit": "Hrs" },
          "gcp": { "value": "0.076432", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "32", "unit": "" },
          "memory": { "value": "256 GiB", "unit": "" },
          "regionCode": { "value": "us-east-2", "unit": "" },
          "operatingSystem": { "value": "Windows", "unit": "" },
          "storage": { "value": "EBS only", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "NA", "unit": "" }
        },
        "skus": ["DZH318Z096SR/Standard_E64s_v5/39c020f9-4583-544b-9488-af34c670b3c1", "FW8E5RQ44WYXEWXN", "generated-n2-highcpu-8"]
      }, {
        "_id": "65661f1d89c8a1f1865387c7",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.278", "unit": "1 Hour" },
          "aws": { "value": "5.3890900000", "unit": "Hrs" },
          "gcp": { "value": "0.337056", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "128", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "3.5 GHz", "unit": "" },
          "memory": { "value": "2048 GiB", "unit": "" },
          "regionCode": { "value": "eu-south-1", "unit": "" },
          "operatingSystem": { "value": "Windows", "unit": "" },
          "storage": { "value": "2 x 1900 NVMe SSD", "unit": "" }
        },
        "skus": ["DZH318Z0CSHB/Standard_E16-4ds_v4/b79c3e44-d17d-58a9-b1eb-da09ed48af83", "ZGR6DNXRR5737GXS", "generated-n2d-highcpu-32"]
      }, {
        "_id": "65661f1d89c8a1f1865387c9",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.348", "unit": "1 Hour" },
          "aws": { "value": "0.8500000000", "unit": "Hrs" },
          "gcp": { "value": "0.001720790", "unit": "gibibyte hour" }
        },
        "fields": {
          "cores": { "value": "8", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "3.1 GHz", "unit": "" },
          "memory": { "value": "64 GiB", "unit": "" },
          "regionCode": { "value": "us-east-1-nyc-1", "unit": "" },
          "operatingSystem": { "value": "RHEL", "unit": "" },
          "storage": { "value": "1 x 300 NVMe SSD", "unit": "" }
        },
        "skus": ["DZH318Z0CM2D/Standard_E20as_v4/00055bd0-12e3-51f0-aba3-e4da5d5948ca", "7ZDKQBZUNSGXYM7X", "3594-142D-9D31"]
      }, {
        "_id": "65661f1d89c8a1f1865387cd",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.22279", "unit": "1 Hour" },
          "aws": { "value": "12.5350000000", "unit": "Hrs" },
          "gcp": { "value": "0.926112", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "48", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "3.1 GHz", "unit": "" },
          "memory": { "value": "384 GiB", "unit": "" },
          "regionCode": { "value": "eu-central-2", "unit": "" },
          "operatingSystem": { "value": "Windows", "unit": "" },
          "storage": { "value": "2 x 900 NVMe SSD", "unit": "" }
        },
        "skus": ["DZH318Z0BQ4W/Standard_M8ms/d9a1dc3d-ffb1-5218-9712-26f30be1c3e0", "WM7UWJD9ZDE79FHU", "generated-n2d-highmem-48"]
      }, {
        "_id": "65661f1d89c8a1f1865387ce",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "8158", "unit": "1 Hour" },
          "aws": { "value": "3.0000000000", "unit": "Hrs" },
          "gcp": { "value": "0.22944", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "48", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "2.5 GHz", "unit": "" },
          "memory": { "value": "192 GiB", "unit": "" },
          "regionCode": { "value": "us-east-2", "unit": "" },
          "operatingSystem": { "value": "Linux", "unit": "" },
          "storage": { "value": "EBS only", "unit": "" }
        },
        "skus": ["DZH318Z0BQ4C/Standard_DS15_v2/3baf2018-c5e6-5f85-b694-40caacfd06a3", "NA5P92APVFZVG887", "generated-e2-standard-16"]
      }, {
        "_id": "65661f1d89c8a1f1865387cf",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.753", "unit": "1 Hour" },
          "aws": { "value": "0.8070000000", "unit": "Hrs" },
          "gcp": { "value": "0.020768", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "8", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "2.5 GHz", "unit": "" },
          "memory": { "value": "30 GiB", "unit": "" },
          "regionCode": { "value": "us-gov-west-1", "unit": "" },
          "operatingSystem": { "value": "Linux", "unit": "" },
          "storage": { "value": "2 x 80 SSD", "unit": "" }
        },
        "skus": ["DZH318Z0CM2B/Standard_D64a_v4/965124bf-7dc6-5c8f-848e-3a8e646506d8", "CFDACKHH8R99KBAT", "generated-e2-standard-4"]
      }, {
        "_id": "65661f1d89c8a1f1865387d0",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "3298", "unit": "1 Hour" },
          "aws": { "value": "3.0932000000", "unit": "Hrs" },
          "gcp": { "value": "0.01548396", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "32", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "3.5 GHz", "unit": "" },
          "memory": { "value": "256 GiB", "unit": "" },
          "regionCode": { "value": "us-east-1", "unit": "" },
          "operatingSystem": { "value": "RHEL", "unit": "" },
          "storage": { "value": "1 x 1900 SSD", "unit": "" }
        },
        "skus": ["DZH318Z0BQ4R/Standard_E8s_v3/fc9dcca7-0238-483e-b166-4f7ec667f5ff", "ASS4GCEV7SWUH73K", "generated-n2d-standard-2"]
      }, {
        "_id": "65661f1d89c8a1f1865387d1",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.325078", "unit": "1 Hour" },
          "aws": { "value": "0.1923000000", "unit": "Hrs" },
          "gcp": { "value": "0.5159744", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "4", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "2.5 GHz", "unit": "" },
          "memory": { "value": "8 GiB", "unit": "" },
          "regionCode": { "value": "us-east-1", "unit": "" },
          "operatingSystem": { "value": "Linux", "unit": "" },
          "storage": { "value": "1 x 237 NVMe SSD", "unit": "" }
        },
        "skus": ["DZH318Z08M9F/Standard_D32d_v5/8472ebb8-d3a6-584a-93a3-5d195e1a2f26", "9X8BNKH4WQSHKGJX", "generated-n1-highcpu-64"]
      }, {
        "_id": "65661f1d89c8a1f1865387d2",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "1.075", "unit": "1 Hour" },
          "aws": { "value": "0", "unit": "" },
          "gcp": { "value": "0.051824", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "4", "unit": "" },
          "clockSpeed": { "value": "2.3 GHz", "unit": "" },
          "memory": { "value": "30.5 GiB", "unit": "" },
          "regionCode": { "value": "us-west-2", "unit": "" },
          "operatingSystem": { "value": "Linux", "unit": "" },
          "storage": { "value": "EBS only", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" }
        },
        "skus": ["DZH318Z0CM92/Standard_E64-32as_v4/9e3f8633-0cdb-5c11-9822-f77019004778", "4ZW3P93ZCPUY2SUY", "generated-n2-standard-4"]
      }, {
        "_id": "65661f1d89c8a1f1865387d3",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "8.136", "unit": "1 Hour" },
          "aws": { "value": "0", "unit": "" },
          "gcp": { "value": "0.812288", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "8", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "2.4 GHz", "unit": "" },
          "memory": { "value": "61 GiB", "unit": "" },
          "regionCode": { "value": "us-gov-east-1", "unit": "" },
          "operatingSystem": { "value": "Linux", "unit": "" },
          "storage": { "value": "6 x 2000 HDD", "unit": "" }
        },
        "skus": ["DZH318Z08NRD/Standard_DC48ds_v3/806067fd-76f9-5518-a159-91e9417d4a37", "AWE5DHP7NFE2ATDA", "generated-n2-highmem-64"]
      }, {
        "_id": "65661f1d89c8a1f1865387d4",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.358954", "unit": "1 Hour" },
          "aws": { "value": "0.6570000000", "unit": "Hrs" },
          "gcp": { "value": "0.865392", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "2", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "3 GHz", "unit": "" },
          "memory": { "value": "4 GiB", "unit": "" },
          "regionCode": { "value": "us-east-2", "unit": "" },
          "operatingSystem": { "value": "Windows", "unit": "" },
          "storage": { "value": "EBS only", "unit": "" }
        },
        "skus": ["DZH318Z0CSHM/Standard_D48ds_v4/6e8b5f5e-05a3-59cf-8199-605c12fd4bea", "2AN5X4YG5DUANVG3", "generated-c3-standard-44-lssd"]
      }, {
        "_id": "65661f1d89c8a1f1865387d5",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.558", "unit": "1 Hour" },
          "aws": { "value": "0.0936000000", "unit": "Hrs" },
          "gcp": { "value": "0.0808576", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "1", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "2.5 GHz", "unit": "" },
          "memory": { "value": "16 GiB", "unit": "" },
          "regionCode": { "value": "us-east-1", "unit": "" },
          "operatingSystem": { "value": "Ubuntu Pro", "unit": "" },
          "storage": { "value": "1 x 59 SSD", "unit": "" }
        },
        "skus": ["DZH318Z0D1L5/Standard_E32d_v4/e9eddae2-d187-5461-9c14-b56c058ca485", "TNFUV4W4XR5AWADJ", "generated-n1-highcpu-16"]
      }, {
        "_id": "65661f1d89c8a1f1865387d6",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.202088", "unit": "1 Hour" },
          "aws": { "value": "0.9570000000", "unit": "Hrs" },
          "gcp": { "value": "0.14184", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "4", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "3.1 GHz", "unit": "" },
          "memory": { "value": "32 GiB", "unit": "" },
          "regionCode": { "value": "us-west-2-den-1", "unit": "" },
          "operatingSystem": { "value": "Red Hat Enterprise Linux with HA", "unit": "" },
          "storage": { "value": "1 x 150 NVMe SSD", "unit": "" }
        },
        "skus": ["DZH318Z0D1L5/Standard_E16d_v4/49667baa-774f-540b-bf7d-4326c0d00bcb", "7BVSR8SRTUG6BR2E", "generated-c2-standard-8"]
      }, {
        "_id": "65661f1d89c8a1f1865387d7",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.0504", "unit": "1 Hour" },
          "aws": { "value": "0", "unit": "" },
          "gcp": { "value": "0.086864", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "2", "unit": "" },
          "clockSpeed": { "value": "2.3 GHz", "unit": "" },
          "memory": { "value": "15.25 GiB", "unit": "" },
          "regionCode": { "value": "eu-west-3", "unit": "" },
          "operatingSystem": { "value": "Linux", "unit": "" },
          "storage": { "value": "EBS only", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" }
        },
        "skus": ["DZH318Z08MC5/Standard_D4ds_v5/e86c52c7-c1c0-57b0-85d2-2867d418048c", "NT5FWN2BBMHFQSTE", "generated-t2d-standard-8"]
      }, {
        "_id": "65661f1d89c8a1f1865387d8",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.345", "unit": "1 Hour" },
          "aws": { "value": "19.3420000000", "unit": "Hrs" },
          "gcp": { "value": "0.22944", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "128", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "3.5 GHz", "unit": "" },
          "memory": { "value": "2048 GiB", "unit": "" },
          "regionCode": { "value": "ap-northeast-3", "unit": "" },
          "operatingSystem": { "value": "Windows", "unit": "" },
          "storage": { "value": "2 x 1900 NVMe SSD", "unit": "" }
        },
        "skus": ["DZH318Z0BPSQ/Standard_DS12_v2_Promo/3e6b5981-3940-5f0d-ae89-9f674e523789", "YKJ7QMTD3S8TRDFV", "generated-e2-standard-16"]
      }, {
        "_id": "65661f1d89c8a1f1865387d9",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "1.168", "unit": "1 Hour" },
          "aws": { "value": "3681", "unit": "Quantity" },
          "gcp": { "value": "0.993264", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "12", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "4 GHz", "unit": "" },
          "memory": { "value": "96 GiB", "unit": "" },
          "regionCode": { "value": "us-east-2", "unit": "" },
          "operatingSystem": { "value": "Linux", "unit": "" },
          "storage": { "value": "1 x 450 NVMe SSD", "unit": "" }
        },
        "skus": ["DZH318Z093WX/Standard_E16-8ads_v5/787dcb18-6b37-56d6-a423-66df0995bd5c", "N6EWMSZM6ZT5AB8X", "generated-n1-highmem-96"]
      }, {
        "_id": "65661f1d89c8a1f1865387da",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "1.034", "unit": "1 Hour" },
          "aws": { "value": "0", "unit": "" },
          "gcp": { "value": "0.318112", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "16", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "3.5 GHz", "unit": "" },
          "memory": { "value": "128 GiB", "unit": "" },
          "regionCode": { "value": "us-gov-west-1", "unit": "" },
          "operatingSystem": { "value": "Windows", "unit": "" },
          "storage": { "value": "EBS only", "unit": "" }
        },
        "skus": ["DZH318Z0BQ4L/Standard_E64_v3/4bc3baa3-b488-5e83-a020-3feeb6073648", "RZHKBXT527U5AYS8", "generated-e2-highmem-16"]
      }, {
        "_id": "65661f1e89c8a1f1865387db",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.032187", "unit": "1 Hour" },
          "aws": { "value": "79.4740000000", "unit": "Hrs" },
          "gcp": { "value": "1.9176512", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "192", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "2.95 GHz", "unit": "" },
          "memory": { "value": "384 GiB", "unit": "" },
          "regionCode": { "value": "us-east-2", "unit": "" },
          "operatingSystem": { "value": "RHEL", "unit": "" },
          "storage": { "value": "EBS only", "unit": "" }
        },
        "skus": ["DZH318Z08MC6/Standard_D4ds_v5/7d179925-5066-52ce-b0a9-63e92fff9a83", "HUQ7ARB4WV3YMQQE", "generated-n1-megamem-96"]
      }]
    }
  }), { status: 200, statusText: "OK" }],
  "/api/categories/instancecomparisons?categoryname=Storage": [JSON.stringify({
    "data": {
      "InstanceComparisons": [{
        "_id": "65661f1d89c8a1f1865387c8",
        "name": { "aws": "AmazonS3", "azure": "Storage", "gcp": "Cloud Storage" },
        "categoryName": "Storage",
        "price": {
          "aws": { "value": "0.0036000000", "unit": "GB-Mo" },
          "azure": { "value": "0.03125", "unit": "10K" },
          "gcp": { "value": "0.000046660", "unit": "gibibyte day" }
        },
        "fields": {
          "regionCode": { "value": "us-east-1", "unit": "" },
          "storageClass": { "value": "Intelligent-Tiering", "unit": "" }
        },
        "skus": ["CRC8UP36GSCYTHBZ", "DZH318Z0BJRN/008Q/484b0f43-74f0-4ca3-bb6c-75f5a723f1ed", "02DA-7F03-3624"]
      }, {
        "_id": "65661f1d89c8a1f1865387ca",
        "name": { "azure": "Storage", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.1", "unit": "10K" },
          "aws": { "value": "0.1500000000", "unit": "GB-Mo" },
          "gcp": { "value": "0.053000000", "unit": "gibibyte month" }
        },
        "fields": {
          "regionCode": { "value": "us-east-1-wl1-dfw1", "unit": "" },
          "storageClass": { "value": "NA", "unit": "" }
        },
        "skus": ["DZH318Z0BJRN/0013/9806198f-b65b-4e0a-bb4c-45a8cd44083d", "NVGUZKU65QDCNQDA", "34B4-8AD8-B01C"]
      }, {
        "_id": "65661f1e89c8a1f1865387dc",
        "name": { "azure": "Storage", "aws": "AmazonEFS", "gcp": "Transfer Appliance" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.01", "unit": "1 GB" },
          "aws": { "value": "0.0250000000", "unit": "GB-Mo" },
          "gcp": { "value": "300.000000000", "unit": "count" }
        },
        "fields": {
          "regionCode": { "value": "eu-west-1", "unit": "" },
          "storageClass": { "value": "Infrequent Access", "unit": "" }
        },
        "skus": ["DZH318Z0BNZJ/0006/d100befb-3816-47b2-9685-748deaa8cf9b", "275C5PEQCXGSDTGF", "2283-CB97-6DE0"]
      }, {
        "_id": "65661f1e89c8a1f1865387dd",
        "name": { "azure": "Storage", "aws": "AmazonSageMaker", "gcp": "Cloud Storage" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.112", "unit": "10K" },
          "aws": { "value": "0.1640000000", "unit": "GB-Mo" },
          "gcp": { "value": "0.000083330", "unit": "gibibyte day" }
        },
        "fields": {
          "regionCode": { "value": "af-south-1", "unit": "" },
          "storageClass": { "value": "NA", "unit": "" }
        },
        "skus": ["DZH318Z0BNZ5/00KZ/583d3c06-1a27-5499-b3da-fb8328c1cb3b", "9EBWCMUUFKJ2MR6M", "4FCE-BDBC-3AD1"]
      }, {
        "_id": "65661f1e89c8a1f1865387de",
        "name": { "azure": "Storage", "aws": "AmazonEFS", "gcp": "Transfer Appliance" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.0256", "unit": "10K" },
          "aws": { "value": "0.0139000000", "unit": "GB-Mo" },
          "gcp": { "value": "1000.000000000", "unit": "month" }
        },
        "fields": {
          "regionCode": { "value": "eu-west-3", "unit": "" },
          "storageClass": { "value": "One Zone-Infrequent Access", "unit": "" }
        },
        "skus": ["DZH318Z0CPS8/003M/0238009a-123c-5750-b13c-4b07732bcd63", "U56HSC8R5F7GTHKN", "9529-5FD8-6533"]
      }, {
        "_id": "65661f1e89c8a1f1865387df",
        "name": { "azure": "Backup", "aws": "AmazonS3", "gcp": "Compute Engine" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.0044", "unit": "1 GB" },
          "aws": { "value": "0.0138000000", "unit": "GB-Mo" },
          "gcp": { "value": "0.020900000", "unit": "gibibyte month" }
        },
        "fields": {
          "regionCode": { "value": "me-south-1", "unit": "" },
          "storageClass": { "value": "Intelligent-Tiering", "unit": "" }
        },
        "skus": ["DZH318Z0BP05/00JS/4dbd2909-2b7a-5788-bef9-e9d45e6cb0aa", "BA6PSX6VRU69E67N", "A711-E8EB-95E8"]
      }, {
        "_id": "65661f1e89c8a1f1865387e0",
        "name": { "azure": "Storage", "aws": "AmazonS3", "gcp": "Compute Engine" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.715", "unit": "1M" },
          "aws": { "value": "0.0220000000", "unit": "GB-Mo" },
          "gcp": { "value": "0.071500000", "unit": "gibibyte month" }
        },
        "fields": {
          "regionCode": { "value": "eu-south-2", "unit": "" },
          "storageClass": { "value": "Archive", "unit": "" }
        },
        "skus": ["DZH318Z0BP6Q/004V/8c211d16-4c1b-506e-8785-cf8c4203bce7", "GNAGVF6CRG6TJU38", "D3E7-D583-8ADB"]
      }, {
        "_id": "65661f1e89c8a1f1865387e1",
        "name": { "azure": "Storage", "aws": "AmazonSageMaker", "gcp": "Cloud Storage" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.163", "unit": "1 GB/Month" },
          "aws": { "value": "0.1200000000", "unit": "GB-Mo" },
          "gcp": { "value": "0.000020000", "unit": "count" }
        },
        "fields": {
          "regionCode": { "value": "eu-central-2", "unit": "" },
          "storageClass": { "value": "NA", "unit": "" }
        },
        "skus": ["DZH318Z0BP0B/001P/c299f2a3-596e-4d5b-b05c-d23b635c0f5d", "SHZPVCYCE8T2DP4X", "007A-40B7-63BC"]
      }, {
        "_id": "65661f1e89c8a1f1865387e2",
        "name": { "azure": "Storage", "aws": "AmazonS3", "gcp": "Database Migration" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.143", "unit": "10K" },
          "aws": { "value": "0.0210000000", "unit": "GB-Mo" },
          "gcp": { "value": "0.480000000", "unit": "gibibyte" }
        },
        "fields": {
          "regionCode": { "value": "us-east-2", "unit": "" },
          "storageClass": { "value": "Archive", "unit": "" }
        },
        "skus": ["DZH318Z0C120/0067/c2bcd1e8-72b5-4bc8-9cad-54cd73786605", "GP37JKNWRFB64C9R", "0C48-A44E-294C"]
      }, {
        "_id": "65661f1e89c8a1f1865387e3",
        "name": { "azure": "Storage", "aws": "AmazonS3", "gcp": "Transfer Appliance" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.0005", "unit": "10K" },
          "aws": { "value": "0.0285000000", "unit": "GB-Mo" },
          "gcp": { "value": "1000.000000000", "unit": "month" }
        },
        "fields": {
          "regionCode": { "value": "us-gov-west-1", "unit": "" },
          "storageClass": { "value": "Non-Critical Data", "unit": "" }
        },
        "skus": ["DZH318Z0BNWT/0026/cd6c9bd2-604f-48d4-b187-7e5e6758567c", "S2PFE7RMY2VJ9HHZ", "9529-5FD8-6533"]
      }, {
        "_id": "65661f1e89c8a1f1865387e4",
        "name": { "azure": "Storage", "aws": "AmazonFSx", "gcp": "Compute Engine" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.143", "unit": "100" },
          "aws": { "value": "0.0660000000", "unit": "GB-Mo" },
          "gcp": { "value": "0.050400000", "unit": "gibibyte month" }
        },
        "fields": {
          "regionCode": { "value": "us-gov-west-1", "unit": "" },
          "storageClass": { "value": "NA", "unit": "" }
        },
        "skus": ["DZH318Z0C120/0018/2318db26-6d9e-4bd9-9db6-8058c9e3ce96", "RYEZTUFA2GH2MPGE", "981E-C44C-77C7"]
      }, {
        "_id": "65661f1e89c8a1f1865387e5",
        "name": { "azure": "Storage", "aws": "AmazonEC2", "gcp": "Cloud Filestore" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.0435", "unit": "1/Month" },
          "aws": { "value": "0.2460000000", "unit": "GB-Mo" },
          "gcp": { "value": "0.090000000", "unit": "gibibyte month" }
        },
        "fields": {
          "regionCode": { "value": "ap-southeast-1-bkk-1", "unit": "" },
          "storageClass": { "value": "NA", "unit": "" }
        },
        "skus": ["DZH318Z0BP88/00V8/dc43b6d8-b313-5bb7-b663-e825c87d22f3", "S9BP74BVGQEB8Q5N", "CDD7-F171-4A80"]
      }, {
        "_id": "65661f1e89c8a1f1865387e6",
        "name": { "azure": "Storage", "aws": "AmazonEFS", "gcp": "Compute Engine" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.002", "unit": "10K" },
          "aws": { "value": "0.3300000000", "unit": "GB-Mo" },
          "gcp": { "value": "0.040000000", "unit": "gibibyte month" }
        },
        "fields": {
          "regionCode": { "value": "eu-south-2", "unit": "" },
          "storageClass": { "value": "General Purpose", "unit": "" }
        },
        "skus": ["DZH318Z0BP88/014V/f0b414e1-f915-5208-80e4-146f2f498c7b", "FZQJRN6BT6V6VVY4", "D973-5D65-BAB2"]
      }, {
        "_id": "65661f1e89c8a1f1865387e7",
        "name": { "azure": "Storage", "aws": "AmazonS3", "gcp": "Compute Engine" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.26", "unit": "100" },
          "aws": { "value": "0.0210000000", "unit": "GB-Mo" },
          "gcp": { "value": "0.065000000", "unit": "month" }
        },
        "fields": {
          "regionCode": { "value": "us-east-2", "unit": "" },
          "storageClass": { "value": "Intelligent-Tiering", "unit": "" }
        },
        "skus": ["DZH318Z0C120/00BP/4fbcf604-70f9-4363-8c7a-79ff4f36fe75", "7EV38VVAXBP8GTNQ", "DCA4-F1BE-57C4"]
      }, {
        "_id": "65661f1e89c8a1f1865387e8",
        "name": { "azure": "Storage", "aws": "AmazonS3", "gcp": "Transfer Appliance" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.00017", "unit": "10K" },
          "aws": { "value": "0.0009900000", "unit": "GB-Mo" },
          "gcp": { "value": "10.000000000", "unit": "count" }
        },
        "fields": {
          "regionCode": { "value": "us-east-1", "unit": "" },
          "storageClass": { "value": "Intelligent-Tiering", "unit": "" }
        },
        "skus": ["DZH318Z0BNWT/006Q/f712754a-ea0d-4d29-98d6-c6b63a418245", "DTFUVA4VWBP8ZQ6D", "FC5A-0778-37DC"]
      }, {
        "_id": "65661f1e89c8a1f1865387e9",
        "name": { "azure": "Storage", "aws": "AmazonS3", "gcp": "Transfer Appliance" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.027523", "unit": "1 GB/Month" },
          "aws": { "value": "0.0138000000", "unit": "GB-Mo" },
          "gcp": { "value": "1800.000000000", "unit": "count" }
        },
        "fields": {
          "regionCode": { "value": "ap-south-1", "unit": "" },
          "storageClass": { "value": "Intelligent-Tiering", "unit": "" }
        },
        "skus": ["DZH318Z0C120/00D9/d56c18df-aac7-412d-8af8-32bf01527ba0", "MDDK4BTVFFXS6P84", "9490-32DB-E101"]
      }, {
        "_id": "65661f1e89c8a1f1865387ea",
        "name": { "azure": "Storage", "aws": "AmazonSageMaker", "gcp": "Transfer Appliance" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.024", "unit": "1 GB" },
          "aws": { "value": "0.1200000000", "unit": "GB-Mo" },
          "gcp": { "value": "1800.000000000", "unit": "count" }
        },
        "fields": {
          "regionCode": { "value": "me-central-1", "unit": "" },
          "storageClass": { "value": "NA", "unit": "" }
        },
        "skus": ["DZH318Z0BJRM/0164/92785843-0ec3-464f-b7fa-8e4fd9d79b9a", "VQTRTSJN8XBZGJVR", "95F6-C300-AD0A"]
      }, {
        "_id": "65661f1e89c8a1f1865387eb",
        "name": { "azure": "Backup", "aws": "AmazonSageMaker", "gcp": "Compute Engine" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.0034", "unit": "1 GB/Month" },
          "aws": { "value": "0.1600000000", "unit": "GB-Mo" },
          "gcp": { "value": "0.080640000", "unit": "gibibyte month" }
        },
        "fields": {
          "regionCode": { "value": "ap-south-1", "unit": "" },
          "storageClass": { "value": "NA", "unit": "" }
        },
        "skus": ["DZH318Z0BP05/00HW/11d757e5-469c-5a41-bb60-5bd360446396", "93XSX4N42UT2TD3M", "558B-E097-BB73"]
      }, {
        "_id": "65661f1e89c8a1f1865387ec",
        "name": { "azure": "Storage", "aws": "AmazonFSx", "gcp": "Cloud Filestore" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0", "unit": "" },
          "aws": { "value": "0.1430000000", "unit": "GB-Mo" },
          "gcp": { "value": "0.240000000", "unit": "gibibyte month" }
        },
        "fields": {
          "regionCode": { "value": "eu-west-1", "unit": "" },
          "storageClass": { "value": "NA", "unit": "" }
        },
        "skus": ["DZH318Z0BNWT/006G/329c176e-8b09-402d-990b-5c62c7ad12e7", "PTC4QTGHGBRWX5TY", "637E-F5F6-8B5E"]
      }, {
        "_id": "65661f1e89c8a1f1865387ed",
        "name": { "azure": "Storage", "aws": "AmazonEC2", "gcp": "Transfer Appliance" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0", "unit": "" },
          "aws": { "value": "0.0590000000", "unit": "GB-Mo" },
          "gcp": { "value": "300.000000000", "unit": "count" }
        },
        "fields": {
          "regionCode": { "value": "eu-central-1", "unit": "" },
          "storageClass": { "value": "NA", "unit": "" }
        },
        "skus": ["DZH318Z0BJRM/01PG/fce6ed87-8cc7-5449-99b7-fb8c2d6c2ef7", "WZCW2T5BKNTTAJG9", "731D-050F-6E31"]
      }, {
        "_id": "65661f1e89c8a1f1865387ee",
        "name": { "azure": "Azure NetApp Files", "aws": "AmazonS3", "gcp": "Transfer Appliance" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.000538", "unit": "1 GiB/Hour" },
          "aws": { "value": "0.0045000000", "unit": "Gigabyte Month" },
          "gcp": { "value": "90.000000000", "unit": "count" }
        },
        "fields": {
          "regionCode": { "value": "us-west-1", "unit": "" },
          "storageClass": { "value": "Intelligent-Tiering", "unit": "" }
        },
        "skus": ["DZH318Z0BXV9/002D/ce61577b-8744-4629-b21f-818d81c0a46c", "EEP5MKDPEUF665W9", "1B95-99C1-33C1"]
      }, {
        "_id": "65661f1e89c8a1f1865387ef",
        "name": { "azure": "Storage", "aws": "AmazonCloudDirectory", "gcp": "Compute Engine" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0.00196", "unit": "10K" },
          "aws": { "value": "0.2500000000", "unit": "GB-Mo" },
          "gcp": { "value": "0.021700000", "unit": "gibibyte month" }
        },
        "fields": {
          "regionCode": { "value": "us-east-2", "unit": "" },
          "storageClass": { "value": "General Purpose", "unit": "" }
        },
        "skus": ["DZH318Z0CPS8/002L/470ae8ce-fa34-44b2-96ec-319dea853ee3", "9JDFFN55MR2WQDBD", "DEDD-2CFE-6A75"]
      }, {
        "_id": "65661f1e89c8a1f1865387f0",
        "name": { "azure": "Storage", "aws": "AmazonS3", "gcp": "Transfer Appliance" },
        "categoryName": "Storage",
        "price": {
          "azure": { "value": "0", "unit": "" },
          "aws": { "value": "0.0050000000", "unit": "GB-Mo" },
          "gcp": { "value": "300.000000000", "unit": "count" }
        },
        "fields": {
          "regionCode": { "value": "me-south-1", "unit": "" },
          "storageClass": { "value": "Intelligent-Tiering", "unit": "" }
        },
        "skus": ["DZH318Z0BNZF/002X/ae106a5c-ed63-4017-a064-6b5b1cf818ad", "QTU7GXN5RSV4E2NK", "731D-050F-6E31"]
      }]
    }
  }), { status: 200, statusText: "OK" }],
  "/api/categories/instancecomparisons?categoryname=Relational Database": [JSON.stringify({
    "data": {
      "InstanceComparisons": [{
        "_id": "65661f1d89c8a1f1865387cb",
        "name": { "azure": "Azure Database for MySQL", "aws": "AmazonRDS", "gcp": "Cloud SQL" },
        "categoryName": "Relational Database",
        "price": {
          "azure": { "value": "0.1016", "unit": "1 Hour" },
          "aws": { "value": "187198", "unit": "Quantity" },
          "gcp": { "value": "0.120000000", "unit": "gibibyte" }
        },
        "fields": {
          "cores": { "value": "96", "unit": "" },
          "memory": { "value": "768 GiB", "unit": "" },
          "storage": { "value": "EBS Only", "unit": "" },
          "location": { "value": "Europe (Spain)", "unit": "" }
        },
        "skus": ["DZH318Z0BQJ7/000C/ace03b73-4864-4a8c-afcb-55ddf91e010e", "8KSXXKS5VFZMUZ6P", "F99B-D454-860B"]
      }, {
        "_id": "65661f1d89c8a1f1865387cc",
        "name": { "azure": "SQL Database", "aws": "AmazonRDS", "gcp": "Cloud SQL" },
        "categoryName": "Relational Database",
        "price": {
          "azure": { "value": "2583", "unit": "1 Hour" },
          "aws": { "value": "2047", "unit": "Quantity" },
          "gcp": { "value": "0.120000000", "unit": "gibibyte" }
        },
        "fields": {
          "cores": { "value": "2", "unit": "" },
          "memory": { "value": "16 GiB", "unit": "" },
          "storage": { "value": "EBS Only", "unit": "" },
          "location": { "value": "US East (N. Virginia)", "unit": "" }
        },
        "skus": ["DZH318Z0BPXH/003D/5faa90e4-31f6-4277-9bdf-d3ae5f0e7ede", "5KE8TCG3FP4Y4ZVZ", "F9C8-328A-51F3"]
      }]
    }
  }), { status: 200, statusText: "OK" }],
  "/categories/instancecomparisons": [JSON.stringify({
    "data": {
      "InstanceComparisons": [{
        "_id": "65661f1d89c8a1f1865387c6",
        "name": { "azure": "Virtual Machines", "aws": "AWSOutposts", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.51607", "unit": "1 Hour" },
          "aws": { "value": "1.4720000000", "unit": "Hrs" },
          "gcp": { "value": "0.076432", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "32", "unit": "" },
          "memory": { "value": "256 GiB", "unit": "" },
          "regionCode": { "value": "us-east-2", "unit": "" },
          "operatingSystem": { "value": "Windows", "unit": "" },
          "storage": { "value": "EBS only", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "NA", "unit": "" }
        },
        "skus": ["DZH318Z096SR/Standard_E64s_v5/39c020f9-4583-544b-9488-af34c670b3c1", "FW8E5RQ44WYXEWXN", "generated-n2-highcpu-8"]
      }, {
        "_id": "65661f1d89c8a1f1865387c7",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.278", "unit": "1 Hour" },
          "aws": { "value": "5.3890900000", "unit": "Hrs" },
          "gcp": { "value": "0.337056", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "128", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "3.5 GHz", "unit": "" },
          "memory": { "value": "2048 GiB", "unit": "" },
          "regionCode": { "value": "eu-south-1", "unit": "" },
          "operatingSystem": { "value": "Windows", "unit": "" },
          "storage": { "value": "2 x 1900 NVMe SSD", "unit": "" }
        },
        "skus": ["DZH318Z0CSHB/Standard_E16-4ds_v4/b79c3e44-d17d-58a9-b1eb-da09ed48af83", "ZGR6DNXRR5737GXS", "generated-n2d-highcpu-32"]
      }, {
        "_id": "65661f1d89c8a1f1865387c9",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.348", "unit": "1 Hour" },
          "aws": { "value": "0.8500000000", "unit": "Hrs" },
          "gcp": { "value": "0.001720790", "unit": "gibibyte hour" }
        },
        "fields": {
          "cores": { "value": "8", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "3.1 GHz", "unit": "" },
          "memory": { "value": "64 GiB", "unit": "" },
          "regionCode": { "value": "us-east-1-nyc-1", "unit": "" },
          "operatingSystem": { "value": "RHEL", "unit": "" },
          "storage": { "value": "1 x 300 NVMe SSD", "unit": "" }
        },
        "skus": ["DZH318Z0CM2D/Standard_E20as_v4/00055bd0-12e3-51f0-aba3-e4da5d5948ca", "7ZDKQBZUNSGXYM7X", "3594-142D-9D31"]
      }, {
        "_id": "65661f1d89c8a1f1865387cd",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.22279", "unit": "1 Hour" },
          "aws": { "value": "12.5350000000", "unit": "Hrs" },
          "gcp": { "value": "0.926112", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "48", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "3.1 GHz", "unit": "" },
          "memory": { "value": "384 GiB", "unit": "" },
          "regionCode": { "value": "eu-central-2", "unit": "" },
          "operatingSystem": { "value": "Windows", "unit": "" },
          "storage": { "value": "2 x 900 NVMe SSD", "unit": "" }
        },
        "skus": ["DZH318Z0BQ4W/Standard_M8ms/d9a1dc3d-ffb1-5218-9712-26f30be1c3e0", "WM7UWJD9ZDE79FHU", "generated-n2d-highmem-48"]
      }, {
        "_id": "65661f1d89c8a1f1865387ce",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "8158", "unit": "1 Hour" },
          "aws": { "value": "3.0000000000", "unit": "Hrs" },
          "gcp": { "value": "0.22944", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "48", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "2.5 GHz", "unit": "" },
          "memory": { "value": "192 GiB", "unit": "" },
          "regionCode": { "value": "us-east-2", "unit": "" },
          "operatingSystem": { "value": "Linux", "unit": "" },
          "storage": { "value": "EBS only", "unit": "" }
        },
        "skus": ["DZH318Z0BQ4C/Standard_DS15_v2/3baf2018-c5e6-5f85-b694-40caacfd06a3", "NA5P92APVFZVG887", "generated-e2-standard-16"]
      }, {
        "_id": "65661f1d89c8a1f1865387cf",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.753", "unit": "1 Hour" },
          "aws": { "value": "0.8070000000", "unit": "Hrs" },
          "gcp": { "value": "0.020768", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "8", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "2.5 GHz", "unit": "" },
          "memory": { "value": "30 GiB", "unit": "" },
          "regionCode": { "value": "us-gov-west-1", "unit": "" },
          "operatingSystem": { "value": "Linux", "unit": "" },
          "storage": { "value": "2 x 80 SSD", "unit": "" }
        },
        "skus": ["DZH318Z0CM2B/Standard_D64a_v4/965124bf-7dc6-5c8f-848e-3a8e646506d8", "CFDACKHH8R99KBAT", "generated-e2-standard-4"]
      }, {
        "_id": "65661f1d89c8a1f1865387d0",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "3298", "unit": "1 Hour" },
          "aws": { "value": "3.0932000000", "unit": "Hrs" },
          "gcp": { "value": "0.01548396", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "32", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "3.5 GHz", "unit": "" },
          "memory": { "value": "256 GiB", "unit": "" },
          "regionCode": { "value": "us-east-1", "unit": "" },
          "operatingSystem": { "value": "RHEL", "unit": "" },
          "storage": { "value": "1 x 1900 SSD", "unit": "" }
        },
        "skus": ["DZH318Z0BQ4R/Standard_E8s_v3/fc9dcca7-0238-483e-b166-4f7ec667f5ff", "ASS4GCEV7SWUH73K", "generated-n2d-standard-2"]
      }, {
        "_id": "65661f1d89c8a1f1865387d1",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.325078", "unit": "1 Hour" },
          "aws": { "value": "0.1923000000", "unit": "Hrs" },
          "gcp": { "value": "0.5159744", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "4", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "2.5 GHz", "unit": "" },
          "memory": { "value": "8 GiB", "unit": "" },
          "regionCode": { "value": "us-east-1", "unit": "" },
          "operatingSystem": { "value": "Linux", "unit": "" },
          "storage": { "value": "1 x 237 NVMe SSD", "unit": "" }
        },
        "skus": ["DZH318Z08M9F/Standard_D32d_v5/8472ebb8-d3a6-584a-93a3-5d195e1a2f26", "9X8BNKH4WQSHKGJX", "generated-n1-highcpu-64"]
      }, {
        "_id": "65661f1d89c8a1f1865387d2",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "1.075", "unit": "1 Hour" },
          "aws": { "value": "0", "unit": "" },
          "gcp": { "value": "0.051824", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "4", "unit": "" },
          "clockSpeed": { "value": "2.3 GHz", "unit": "" },
          "memory": { "value": "30.5 GiB", "unit": "" },
          "regionCode": { "value": "us-west-2", "unit": "" },
          "operatingSystem": { "value": "Linux", "unit": "" },
          "storage": { "value": "EBS only", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" }
        },
        "skus": ["DZH318Z0CM92/Standard_E64-32as_v4/9e3f8633-0cdb-5c11-9822-f77019004778", "4ZW3P93ZCPUY2SUY", "generated-n2-standard-4"]
      }, {
        "_id": "65661f1d89c8a1f1865387d3",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "8.136", "unit": "1 Hour" },
          "aws": { "value": "0", "unit": "" },
          "gcp": { "value": "0.812288", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "8", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "2.4 GHz", "unit": "" },
          "memory": { "value": "61 GiB", "unit": "" },
          "regionCode": { "value": "us-gov-east-1", "unit": "" },
          "operatingSystem": { "value": "Linux", "unit": "" },
          "storage": { "value": "6 x 2000 HDD", "unit": "" }
        },
        "skus": ["DZH318Z08NRD/Standard_DC48ds_v3/806067fd-76f9-5518-a159-91e9417d4a37", "AWE5DHP7NFE2ATDA", "generated-n2-highmem-64"]
      }, {
        "_id": "65661f1d89c8a1f1865387d4",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.358954", "unit": "1 Hour" },
          "aws": { "value": "0.6570000000", "unit": "Hrs" },
          "gcp": { "value": "0.865392", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "2", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "3 GHz", "unit": "" },
          "memory": { "value": "4 GiB", "unit": "" },
          "regionCode": { "value": "us-east-2", "unit": "" },
          "operatingSystem": { "value": "Windows", "unit": "" },
          "storage": { "value": "EBS only", "unit": "" }
        },
        "skus": ["DZH318Z0CSHM/Standard_D48ds_v4/6e8b5f5e-05a3-59cf-8199-605c12fd4bea", "2AN5X4YG5DUANVG3", "generated-c3-standard-44-lssd"]
      }, {
        "_id": "65661f1d89c8a1f1865387d5",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.558", "unit": "1 Hour" },
          "aws": { "value": "0.0936000000", "unit": "Hrs" },
          "gcp": { "value": "0.0808576", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "1", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "2.5 GHz", "unit": "" },
          "memory": { "value": "16 GiB", "unit": "" },
          "regionCode": { "value": "us-east-1", "unit": "" },
          "operatingSystem": { "value": "Ubuntu Pro", "unit": "" },
          "storage": { "value": "1 x 59 SSD", "unit": "" }
        },
        "skus": ["DZH318Z0D1L5/Standard_E32d_v4/e9eddae2-d187-5461-9c14-b56c058ca485", "TNFUV4W4XR5AWADJ", "generated-n1-highcpu-16"]
      }, {
        "_id": "65661f1d89c8a1f1865387d6",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.202088", "unit": "1 Hour" },
          "aws": { "value": "0.9570000000", "unit": "Hrs" },
          "gcp": { "value": "0.14184", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "4", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "3.1 GHz", "unit": "" },
          "memory": { "value": "32 GiB", "unit": "" },
          "regionCode": { "value": "us-west-2-den-1", "unit": "" },
          "operatingSystem": { "value": "Red Hat Enterprise Linux with HA", "unit": "" },
          "storage": { "value": "1 x 150 NVMe SSD", "unit": "" }
        },
        "skus": ["DZH318Z0D1L5/Standard_E16d_v4/49667baa-774f-540b-bf7d-4326c0d00bcb", "7BVSR8SRTUG6BR2E", "generated-c2-standard-8"]
      }, {
        "_id": "65661f1d89c8a1f1865387d7",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.0504", "unit": "1 Hour" },
          "aws": { "value": "0", "unit": "" },
          "gcp": { "value": "0.086864", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "2", "unit": "" },
          "clockSpeed": { "value": "2.3 GHz", "unit": "" },
          "memory": { "value": "15.25 GiB", "unit": "" },
          "regionCode": { "value": "eu-west-3", "unit": "" },
          "operatingSystem": { "value": "Linux", "unit": "" },
          "storage": { "value": "EBS only", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" }
        },
        "skus": ["DZH318Z08MC5/Standard_D4ds_v5/e86c52c7-c1c0-57b0-85d2-2867d418048c", "NT5FWN2BBMHFQSTE", "generated-t2d-standard-8"]
      }, {
        "_id": "65661f1d89c8a1f1865387d8",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.345", "unit": "1 Hour" },
          "aws": { "value": "19.3420000000", "unit": "Hrs" },
          "gcp": { "value": "0.22944", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "128", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "3.5 GHz", "unit": "" },
          "memory": { "value": "2048 GiB", "unit": "" },
          "regionCode": { "value": "ap-northeast-3", "unit": "" },
          "operatingSystem": { "value": "Windows", "unit": "" },
          "storage": { "value": "2 x 1900 NVMe SSD", "unit": "" }
        },
        "skus": ["DZH318Z0BPSQ/Standard_DS12_v2_Promo/3e6b5981-3940-5f0d-ae89-9f674e523789", "YKJ7QMTD3S8TRDFV", "generated-e2-standard-16"]
      }, {
        "_id": "65661f1d89c8a1f1865387d9",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "1.168", "unit": "1 Hour" },
          "aws": { "value": "3681", "unit": "Quantity" },
          "gcp": { "value": "0.993264", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "12", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "4 GHz", "unit": "" },
          "memory": { "value": "96 GiB", "unit": "" },
          "regionCode": { "value": "us-east-2", "unit": "" },
          "operatingSystem": { "value": "Linux", "unit": "" },
          "storage": { "value": "1 x 450 NVMe SSD", "unit": "" }
        },
        "skus": ["DZH318Z093WX/Standard_E16-8ads_v5/787dcb18-6b37-56d6-a423-66df0995bd5c", "N6EWMSZM6ZT5AB8X", "generated-n1-highmem-96"]
      }, {
        "_id": "65661f1d89c8a1f1865387da",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "1.034", "unit": "1 Hour" },
          "aws": { "value": "0", "unit": "" },
          "gcp": { "value": "0.318112", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "16", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "3.5 GHz", "unit": "" },
          "memory": { "value": "128 GiB", "unit": "" },
          "regionCode": { "value": "us-gov-west-1", "unit": "" },
          "operatingSystem": { "value": "Windows", "unit": "" },
          "storage": { "value": "EBS only", "unit": "" }
        },
        "skus": ["DZH318Z0BQ4L/Standard_E64_v3/4bc3baa3-b488-5e83-a020-3feeb6073648", "RZHKBXT527U5AYS8", "generated-e2-highmem-16"]
      }, {
        "_id": "65661f1e89c8a1f1865387db",
        "name": { "azure": "Virtual Machines", "aws": "AmazonEC2", "gcp": "Compute Engine" },
        "categoryName": "Compute",
        "price": {
          "azure": { "value": "0.032187", "unit": "1 Hour" },
          "aws": { "value": "79.4740000000", "unit": "Hrs" },
          "gcp": { "value": "1.9176512", "unit": "Hours" }
        },
        "fields": {
          "cores": { "value": "192", "unit": "" },
          "gpuMemory": { "value": "NA", "unit": "" },
          "clockSpeed": { "value": "2.95 GHz", "unit": "" },
          "memory": { "value": "384 GiB", "unit": "" },
          "regionCode": { "value": "us-east-2", "unit": "" },
          "operatingSystem": { "value": "RHEL", "unit": "" },
          "storage": { "value": "EBS only", "unit": "" }
        },
        "skus": ["DZH318Z08MC6/Standard_D4ds_v5/7d179925-5066-52ce-b0a9-63e92fff9a83", "HUQ7ARB4WV3YMQQE", "generated-n1-megamem-96"]
      },
        {
          "_id": "65661f1d89c8a1f1865387cb",
          "name": { "azure": "Azure Database for MySQL", "aws": "AmazonRDS", "gcp": "Cloud SQL" },
          "categoryName": "Relational Database",
          "price": {
            "azure": { "value": "0.1016", "unit": "1 Hour" },
            "aws": { "value": "187198", "unit": "Quantity" },
            "gcp": { "value": "0.120000000", "unit": "gibibyte" }
          },
          "fields": {
            "cores": { "value": "96", "unit": "" },
            "memory": { "value": "768 GiB", "unit": "" },
            "storage": { "value": "EBS Only", "unit": "" },
            "location": { "value": "Europe (Spain)", "unit": "" }
          },
          "skus": ["DZH318Z0BQJ7/000C/ace03b73-4864-4a8c-afcb-55ddf91e010e", "8KSXXKS5VFZMUZ6P", "F99B-D454-860B"]
        }, {
          "_id": "65661f1d89c8a1f1865387cc",
          "name": { "azure": "SQL Database", "aws": "AmazonRDS", "gcp": "Cloud SQL" },
          "categoryName": "Relational Database",
          "price": {
            "azure": { "value": "2583", "unit": "1 Hour" },
            "aws": { "value": "2047", "unit": "Quantity" },
            "gcp": { "value": "0.120000000", "unit": "gibibyte" }
          },
          "fields": {
            "cores": { "value": "2", "unit": "" },
            "memory": { "value": "16 GiB", "unit": "" },
            "storage": { "value": "EBS Only", "unit": "" },
            "location": { "value": "US East (N. Virginia)", "unit": "" }
          },
          "skus": ["DZH318Z0BPXH/003D/5faa90e4-31f6-4277-9bdf-d3ae5f0e7ede", "5KE8TCG3FP4Y4ZVZ", "F9C8-328A-51F3"]
        }, {
          "_id": "65661f1d89c8a1f1865387c8",
          "name": { "aws": "AmazonS3", "azure": "Storage", "gcp": "Cloud Storage" },
          "categoryName": "Storage",
          "price": {
            "aws": { "value": "0.0036000000", "unit": "GB-Mo" },
            "azure": { "value": "0.03125", "unit": "10K" },
            "gcp": { "value": "0.000046660", "unit": "gibibyte day" }
          },
          "fields": {
            "regionCode": { "value": "us-east-1", "unit": "" },
            "storageClass": { "value": "Intelligent-Tiering", "unit": "" }
          },
          "skus": ["CRC8UP36GSCYTHBZ", "DZH318Z0BJRN/008Q/484b0f43-74f0-4ca3-bb6c-75f5a723f1ed", "02DA-7F03-3624"]
        }, {
          "_id": "65661f1d89c8a1f1865387ca",
          "name": { "azure": "Storage", "aws": "AmazonEC2", "gcp": "Compute Engine" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.1", "unit": "10K" },
            "aws": { "value": "0.1500000000", "unit": "GB-Mo" },
            "gcp": { "value": "0.053000000", "unit": "gibibyte month" }
          },
          "fields": {
            "regionCode": { "value": "us-east-1-wl1-dfw1", "unit": "" },
            "storageClass": { "value": "NA", "unit": "" }
          },
          "skus": ["DZH318Z0BJRN/0013/9806198f-b65b-4e0a-bb4c-45a8cd44083d", "NVGUZKU65QDCNQDA", "34B4-8AD8-B01C"]
        }, {
          "_id": "65661f1e89c8a1f1865387dc",
          "name": { "azure": "Storage", "aws": "AmazonEFS", "gcp": "Transfer Appliance" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.01", "unit": "1 GB" },
            "aws": { "value": "0.0250000000", "unit": "GB-Mo" },
            "gcp": { "value": "300.000000000", "unit": "count" }
          },
          "fields": {
            "regionCode": { "value": "eu-west-1", "unit": "" },
            "storageClass": { "value": "Infrequent Access", "unit": "" }
          },
          "skus": ["DZH318Z0BNZJ/0006/d100befb-3816-47b2-9685-748deaa8cf9b", "275C5PEQCXGSDTGF", "2283-CB97-6DE0"]
        }, {
          "_id": "65661f1e89c8a1f1865387dd",
          "name": { "azure": "Storage", "aws": "AmazonSageMaker", "gcp": "Cloud Storage" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.112", "unit": "10K" },
            "aws": { "value": "0.1640000000", "unit": "GB-Mo" },
            "gcp": { "value": "0.000083330", "unit": "gibibyte day" }
          },
          "fields": {
            "regionCode": { "value": "af-south-1", "unit": "" },
            "storageClass": { "value": "NA", "unit": "" }
          },
          "skus": ["DZH318Z0BNZ5/00KZ/583d3c06-1a27-5499-b3da-fb8328c1cb3b", "9EBWCMUUFKJ2MR6M", "4FCE-BDBC-3AD1"]
        }, {
          "_id": "65661f1e89c8a1f1865387de",
          "name": { "azure": "Storage", "aws": "AmazonEFS", "gcp": "Transfer Appliance" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.0256", "unit": "10K" },
            "aws": { "value": "0.0139000000", "unit": "GB-Mo" },
            "gcp": { "value": "1000.000000000", "unit": "month" }
          },
          "fields": {
            "regionCode": { "value": "eu-west-3", "unit": "" },
            "storageClass": { "value": "One Zone-Infrequent Access", "unit": "" }
          },
          "skus": ["DZH318Z0CPS8/003M/0238009a-123c-5750-b13c-4b07732bcd63", "U56HSC8R5F7GTHKN", "9529-5FD8-6533"]
        }, {
          "_id": "65661f1e89c8a1f1865387df",
          "name": { "azure": "Backup", "aws": "AmazonS3", "gcp": "Compute Engine" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.0044", "unit": "1 GB" },
            "aws": { "value": "0.0138000000", "unit": "GB-Mo" },
            "gcp": { "value": "0.020900000", "unit": "gibibyte month" }
          },
          "fields": {
            "regionCode": { "value": "me-south-1", "unit": "" },
            "storageClass": { "value": "Intelligent-Tiering", "unit": "" }
          },
          "skus": ["DZH318Z0BP05/00JS/4dbd2909-2b7a-5788-bef9-e9d45e6cb0aa", "BA6PSX6VRU69E67N", "A711-E8EB-95E8"]
        }, {
          "_id": "65661f1e89c8a1f1865387e0",
          "name": { "azure": "Storage", "aws": "AmazonS3", "gcp": "Compute Engine" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.715", "unit": "1M" },
            "aws": { "value": "0.0220000000", "unit": "GB-Mo" },
            "gcp": { "value": "0.071500000", "unit": "gibibyte month" }
          },
          "fields": {
            "regionCode": { "value": "eu-south-2", "unit": "" },
            "storageClass": { "value": "Archive", "unit": "" }
          },
          "skus": ["DZH318Z0BP6Q/004V/8c211d16-4c1b-506e-8785-cf8c4203bce7", "GNAGVF6CRG6TJU38", "D3E7-D583-8ADB"]
        }, {
          "_id": "65661f1e89c8a1f1865387e1",
          "name": { "azure": "Storage", "aws": "AmazonSageMaker", "gcp": "Cloud Storage" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.163", "unit": "1 GB/Month" },
            "aws": { "value": "0.1200000000", "unit": "GB-Mo" },
            "gcp": { "value": "0.000020000", "unit": "count" }
          },
          "fields": {
            "regionCode": { "value": "eu-central-2", "unit": "" },
            "storageClass": { "value": "NA", "unit": "" }
          },
          "skus": ["DZH318Z0BP0B/001P/c299f2a3-596e-4d5b-b05c-d23b635c0f5d", "SHZPVCYCE8T2DP4X", "007A-40B7-63BC"]
        }, {
          "_id": "65661f1e89c8a1f1865387e2",
          "name": { "azure": "Storage", "aws": "AmazonS3", "gcp": "Database Migration" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.143", "unit": "10K" },
            "aws": { "value": "0.0210000000", "unit": "GB-Mo" },
            "gcp": { "value": "0.480000000", "unit": "gibibyte" }
          },
          "fields": {
            "regionCode": { "value": "us-east-2", "unit": "" },
            "storageClass": { "value": "Archive", "unit": "" }
          },
          "skus": ["DZH318Z0C120/0067/c2bcd1e8-72b5-4bc8-9cad-54cd73786605", "GP37JKNWRFB64C9R", "0C48-A44E-294C"]
        }, {
          "_id": "65661f1e89c8a1f1865387e3",
          "name": { "azure": "Storage", "aws": "AmazonS3", "gcp": "Transfer Appliance" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.0005", "unit": "10K" },
            "aws": { "value": "0.0285000000", "unit": "GB-Mo" },
            "gcp": { "value": "1000.000000000", "unit": "month" }
          },
          "fields": {
            "regionCode": { "value": "us-gov-west-1", "unit": "" },
            "storageClass": { "value": "Non-Critical Data", "unit": "" }
          },
          "skus": ["DZH318Z0BNWT/0026/cd6c9bd2-604f-48d4-b187-7e5e6758567c", "S2PFE7RMY2VJ9HHZ", "9529-5FD8-6533"]
        }, {
          "_id": "65661f1e89c8a1f1865387e4",
          "name": { "azure": "Storage", "aws": "AmazonFSx", "gcp": "Compute Engine" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.143", "unit": "100" },
            "aws": { "value": "0.0660000000", "unit": "GB-Mo" },
            "gcp": { "value": "0.050400000", "unit": "gibibyte month" }
          },
          "fields": {
            "regionCode": { "value": "us-gov-west-1", "unit": "" },
            "storageClass": { "value": "NA", "unit": "" }
          },
          "skus": ["DZH318Z0C120/0018/2318db26-6d9e-4bd9-9db6-8058c9e3ce96", "RYEZTUFA2GH2MPGE", "981E-C44C-77C7"]
        }, {
          "_id": "65661f1e89c8a1f1865387e5",
          "name": { "azure": "Storage", "aws": "AmazonEC2", "gcp": "Cloud Filestore" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.0435", "unit": "1/Month" },
            "aws": { "value": "0.2460000000", "unit": "GB-Mo" },
            "gcp": { "value": "0.090000000", "unit": "gibibyte month" }
          },
          "fields": {
            "regionCode": { "value": "ap-southeast-1-bkk-1", "unit": "" },
            "storageClass": { "value": "NA", "unit": "" }
          },
          "skus": ["DZH318Z0BP88/00V8/dc43b6d8-b313-5bb7-b663-e825c87d22f3", "S9BP74BVGQEB8Q5N", "CDD7-F171-4A80"]
        }, {
          "_id": "65661f1e89c8a1f1865387e6",
          "name": { "azure": "Storage", "aws": "AmazonEFS", "gcp": "Compute Engine" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.002", "unit": "10K" },
            "aws": { "value": "0.3300000000", "unit": "GB-Mo" },
            "gcp": { "value": "0.040000000", "unit": "gibibyte month" }
          },
          "fields": {
            "regionCode": { "value": "eu-south-2", "unit": "" },
            "storageClass": { "value": "General Purpose", "unit": "" }
          },
          "skus": ["DZH318Z0BP88/014V/f0b414e1-f915-5208-80e4-146f2f498c7b", "FZQJRN6BT6V6VVY4", "D973-5D65-BAB2"]
        }, {
          "_id": "65661f1e89c8a1f1865387e7",
          "name": { "azure": "Storage", "aws": "AmazonS3", "gcp": "Compute Engine" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.26", "unit": "100" },
            "aws": { "value": "0.0210000000", "unit": "GB-Mo" },
            "gcp": { "value": "0.065000000", "unit": "month" }
          },
          "fields": {
            "regionCode": { "value": "us-east-2", "unit": "" },
            "storageClass": { "value": "Intelligent-Tiering", "unit": "" }
          },
          "skus": ["DZH318Z0C120/00BP/4fbcf604-70f9-4363-8c7a-79ff4f36fe75", "7EV38VVAXBP8GTNQ", "DCA4-F1BE-57C4"]
        }, {
          "_id": "65661f1e89c8a1f1865387e8",
          "name": { "azure": "Storage", "aws": "AmazonS3", "gcp": "Transfer Appliance" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.00017", "unit": "10K" },
            "aws": { "value": "0.0009900000", "unit": "GB-Mo" },
            "gcp": { "value": "10.000000000", "unit": "count" }
          },
          "fields": {
            "regionCode": { "value": "us-east-1", "unit": "" },
            "storageClass": { "value": "Intelligent-Tiering", "unit": "" }
          },
          "skus": ["DZH318Z0BNWT/006Q/f712754a-ea0d-4d29-98d6-c6b63a418245", "DTFUVA4VWBP8ZQ6D", "FC5A-0778-37DC"]
        }, {
          "_id": "65661f1e89c8a1f1865387e9",
          "name": { "azure": "Storage", "aws": "AmazonS3", "gcp": "Transfer Appliance" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.027523", "unit": "1 GB/Month" },
            "aws": { "value": "0.0138000000", "unit": "GB-Mo" },
            "gcp": { "value": "1800.000000000", "unit": "count" }
          },
          "fields": {
            "regionCode": { "value": "ap-south-1", "unit": "" },
            "storageClass": { "value": "Intelligent-Tiering", "unit": "" }
          },
          "skus": ["DZH318Z0C120/00D9/d56c18df-aac7-412d-8af8-32bf01527ba0", "MDDK4BTVFFXS6P84", "9490-32DB-E101"]
        }, {
          "_id": "65661f1e89c8a1f1865387ea",
          "name": { "azure": "Storage", "aws": "AmazonSageMaker", "gcp": "Transfer Appliance" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.024", "unit": "1 GB" },
            "aws": { "value": "0.1200000000", "unit": "GB-Mo" },
            "gcp": { "value": "1800.000000000", "unit": "count" }
          },
          "fields": {
            "regionCode": { "value": "me-central-1", "unit": "" },
            "storageClass": { "value": "NA", "unit": "" }
          },
          "skus": ["DZH318Z0BJRM/0164/92785843-0ec3-464f-b7fa-8e4fd9d79b9a", "VQTRTSJN8XBZGJVR", "95F6-C300-AD0A"]
        }, {
          "_id": "65661f1e89c8a1f1865387eb",
          "name": { "azure": "Backup", "aws": "AmazonSageMaker", "gcp": "Compute Engine" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.0034", "unit": "1 GB/Month" },
            "aws": { "value": "0.1600000000", "unit": "GB-Mo" },
            "gcp": { "value": "0.080640000", "unit": "gibibyte month" }
          },
          "fields": {
            "regionCode": { "value": "ap-south-1", "unit": "" },
            "storageClass": { "value": "NA", "unit": "" }
          },
          "skus": ["DZH318Z0BP05/00HW/11d757e5-469c-5a41-bb60-5bd360446396", "93XSX4N42UT2TD3M", "558B-E097-BB73"]
        }, {
          "_id": "65661f1e89c8a1f1865387ec",
          "name": { "azure": "Storage", "aws": "AmazonFSx", "gcp": "Cloud Filestore" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0", "unit": "" },
            "aws": { "value": "0.1430000000", "unit": "GB-Mo" },
            "gcp": { "value": "0.240000000", "unit": "gibibyte month" }
          },
          "fields": {
            "regionCode": { "value": "eu-west-1", "unit": "" },
            "storageClass": { "value": "NA", "unit": "" }
          },
          "skus": ["DZH318Z0BNWT/006G/329c176e-8b09-402d-990b-5c62c7ad12e7", "PTC4QTGHGBRWX5TY", "637E-F5F6-8B5E"]
        }, {
          "_id": "65661f1e89c8a1f1865387ed",
          "name": { "azure": "Storage", "aws": "AmazonEC2", "gcp": "Transfer Appliance" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0", "unit": "" },
            "aws": { "value": "0.0590000000", "unit": "GB-Mo" },
            "gcp": { "value": "300.000000000", "unit": "count" }
          },
          "fields": {
            "regionCode": { "value": "eu-central-1", "unit": "" },
            "storageClass": { "value": "NA", "unit": "" }
          },
          "skus": ["DZH318Z0BJRM/01PG/fce6ed87-8cc7-5449-99b7-fb8c2d6c2ef7", "WZCW2T5BKNTTAJG9", "731D-050F-6E31"]
        }, {
          "_id": "65661f1e89c8a1f1865387ee",
          "name": { "azure": "Azure NetApp Files", "aws": "AmazonS3", "gcp": "Transfer Appliance" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.000538", "unit": "1 GiB/Hour" },
            "aws": { "value": "0.0045000000", "unit": "Gigabyte Month" },
            "gcp": { "value": "90.000000000", "unit": "count" }
          },
          "fields": {
            "regionCode": { "value": "us-west-1", "unit": "" },
            "storageClass": { "value": "Intelligent-Tiering", "unit": "" }
          },
          "skus": ["DZH318Z0BXV9/002D/ce61577b-8744-4629-b21f-818d81c0a46c", "EEP5MKDPEUF665W9", "1B95-99C1-33C1"]
        }, {
          "_id": "65661f1e89c8a1f1865387ef",
          "name": { "azure": "Storage", "aws": "AmazonCloudDirectory", "gcp": "Compute Engine" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0.00196", "unit": "10K" },
            "aws": { "value": "0.2500000000", "unit": "GB-Mo" },
            "gcp": { "value": "0.021700000", "unit": "gibibyte month" }
          },
          "fields": {
            "regionCode": { "value": "us-east-2", "unit": "" },
            "storageClass": { "value": "General Purpose", "unit": "" }
          },
          "skus": ["DZH318Z0CPS8/002L/470ae8ce-fa34-44b2-96ec-319dea853ee3", "9JDFFN55MR2WQDBD", "DEDD-2CFE-6A75"]
        }, {
          "_id": "65661f1e89c8a1f1865387f0",
          "name": { "azure": "Storage", "aws": "AmazonS3", "gcp": "Transfer Appliance" },
          "categoryName": "Storage",
          "price": {
            "azure": { "value": "0", "unit": "" },
            "aws": { "value": "0.0050000000", "unit": "GB-Mo" },
            "gcp": { "value": "300.000000000", "unit": "count" }
          },
          "fields": {
            "regionCode": { "value": "me-south-1", "unit": "" },
            "storageClass": { "value": "Intelligent-Tiering", "unit": "" }
          },
          "skus": ["DZH318Z0BNZF/002X/ae106a5c-ed63-4017-a064-6b5b1cf818ad", "QTU7GXN5RSV4E2NK", "731D-050F-6E31"]
        }]
    }
  }), { status: 200, statusText: "OK" }]
};
