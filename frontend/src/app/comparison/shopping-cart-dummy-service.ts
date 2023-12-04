import {ShoppingCartService} from "../shopping-cart.service";

export class ShoppingCartDummyService extends ShoppingCartService {
  public static Instance: ShoppingCartDummyService;
  constructor() {
    super();
    ShoppingCartDummyService.Instance = this;
    this.setItems([{
        "instance": {
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
        },
        "pricingInformation": {
          "azure": {"factor": 720, "price": 371.5704},
          "aws": {"factor": 720, "price": 1059.84},
          "gcp": {"factor": 720, "price": 55.03104}
        },
        "units": [{
          "providerName": "azure",
          "providerDefault": {
            "tokens": ["1", "Hour"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "hour",
              "milliseconds": 3600000,
              "selected": "hour"
            }]
          },
          "configuration": {
            "tokens": ["1", "Hour"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "hour",
              "milliseconds": 3600000,
              "selected": "month"
            }]
          }
        }, {
          "providerName": "aws",
          "providerDefault": {
            "tokens": ["Hrs"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "hour",
              "milliseconds": 3600000,
              "selected": "hour"
            }]
          },
          "configuration": {
            "tokens": ["1", "Hour"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "hour",
              "milliseconds": 3600000,
              "selected": "month"
            }]
          }
        }, {
          "providerName": "gcp",
          "providerDefault": {
            "tokens": ["Hours"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "hour",
              "milliseconds": 3600000,
              "selected": "hour"
            }]
          },
          "configuration": {
            "tokens": ["1", "Hour"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "hour",
              "milliseconds": 3600000,
              "selected": "month"
            }]
          }
        }],
        "selectedProvider": "gcp",
        "notes": "backend"
      }, {
        "instance": {
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
        },
        "pricingInformation": {
          "azure": {"factor": 720, "price": 250.55999999999997},
          "aws": {"factor": 720, "price": 612},
          "gcp": {"factor": 46080, "price": 79.2940032}
        },
        "units": [{
          "providerName": "azure",
          "providerDefault": {
            "tokens": ["1", "Hour"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "hour",
              "milliseconds": 3600000,
              "selected": "hour"
            }]
          },
          "configuration": {
            "tokens": ["1", "Hour"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "hour",
              "milliseconds": 3600000,
              "selected": "month"
            }]
          }
        }, {
          "providerName": "aws",
          "providerDefault": {
            "tokens": ["Hrs"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "hour",
              "milliseconds": 3600000,
              "selected": "hour"
            }]
          },
          "configuration": {
            "tokens": ["1", "Hour"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "hour",
              "milliseconds": 3600000,
              "selected": "month"
            }]
          }
        }, {
          "providerName": "gcp",
          "providerDefault": {
            "tokens": ["gibibyte", "hour"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "token": "gibibyte",
              "unitName": "StorageUnitCategorisation",
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "type": "string",
              "options": ["Byte", "Kilobyte", "Megabyte", "Gigabyte", "Terabyte", "Petabyte", "Exabyte"],
              "value": 134217728,
              "selected": "Gigabyte"
            }, {
              "token": "/",
              "unitName": "DivisionUnitCategorisation",
              "options": null,
              "type": "division",
              "acceptsUserInput": false,
              "inputType": null,
              "selected": null
            }, {
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "hour",
              "milliseconds": 3600000,
              "selected": "hour"
            }]
          },
          "configuration": {
            "tokens": ["gibibyte", "hour"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "token": "gibibyte",
              "unitName": "StorageUnitCategorisation",
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "type": "string",
              "options": ["Byte", "Kilobyte", "Megabyte", "Gigabyte", "Terabyte", "Petabyte", "Exabyte"],
              "value": 134217728,
              "selected": "Gigabyte"
            }, {
              "token": "/",
              "unitName": "DivisionUnitCategorisation",
              "options": null,
              "type": "division",
              "acceptsUserInput": false,
              "inputType": null,
              "selected": null
            }, {
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "hour",
              "milliseconds": 3600000,
              "selected": "month"
            }]
          }
        }],
        "selectedProvider": "gcp",
        "notes": "frontend"
      }, {
        "instance": {
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
        },
        "pricingInformation": {
          "aws": {"factor": 1, "price": 0.0036},
          "azure": {"factor": 1, "price": 0.03125},
          "gcp": {"factor": 1920, "price": 0.08958719999999999}
        },
        "units": [{
          "providerName": "aws",
          "providerDefault": {
            "tokens": ["GB", "-", "Mo"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "token": "GB",
              "unitName": "StorageUnitCategorisation",
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "type": "string",
              "options": ["Byte", "Kilobyte", "Megabyte", "Gigabyte", "Terabyte", "Petabyte", "Exabyte"],
              "value": 8589934592,
              "selected": "Gigabyte"
            }, {
              "token": "-",
              "unitName": "DivisionUnitCategorisation",
              "options": null,
              "type": "division",
              "acceptsUserInput": false,
              "inputType": null,
              "selected": null
            }, {
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "month",
              "milliseconds": 2592000000,
              "selected": "month"
            }]
          },
          "configuration": {
            "tokens": ["GB", "-", "Mo"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "token": "GB",
              "unitName": "StorageUnitCategorisation",
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "type": "string",
              "options": ["Byte", "Kilobyte", "Megabyte", "Gigabyte", "Terabyte", "Petabyte", "Exabyte"],
              "value": 8589934592,
              "selected": "Gigabyte"
            }, {
              "token": "-",
              "unitName": "DivisionUnitCategorisation",
              "options": null,
              "type": "division",
              "acceptsUserInput": false,
              "inputType": null,
              "selected": null
            }, {
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "month",
              "milliseconds": 2592000000,
              "selected": "month"
            }]
          }
        }, {
          "providerName": "azure",
          "providerDefault": {
            "tokens": ["10", "K"],
            "categories": [{
              "token": "10",
              "unitName": "NumberUnitCategorisation",
              "value": 10000,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }]
          },
          "configuration": {
            "tokens": ["10", "K"],
            "categories": [{
              "token": "10",
              "unitName": "NumberUnitCategorisation",
              "value": 10000,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }]
          }
        }, {
          "providerName": "gcp",
          "providerDefault": {
            "tokens": ["gibibyte", "day"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "token": "gibibyte",
              "unitName": "StorageUnitCategorisation",
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "type": "string",
              "options": ["Byte", "Kilobyte", "Megabyte", "Gigabyte", "Terabyte", "Petabyte", "Exabyte"],
              "value": 134217728,
              "selected": "Gigabyte"
            }, {
              "token": "/",
              "unitName": "DivisionUnitCategorisation",
              "options": null,
              "type": "division",
              "acceptsUserInput": false,
              "inputType": null,
              "selected": null
            }, {
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "day",
              "milliseconds": 86400000,
              "selected": "day"
            }]
          },
          "configuration": {
            "tokens": ["GB", "-", "Mo"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "token": "GB",
              "unitName": "StorageUnitCategorisation",
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "type": "string",
              "options": ["Byte", "Kilobyte", "Megabyte", "Gigabyte", "Terabyte", "Petabyte", "Exabyte"],
              "value": 8589934592,
              "selected": "Gigabyte"
            }, {
              "token": "-",
              "unitName": "DivisionUnitCategorisation",
              "options": null,
              "type": "division",
              "acceptsUserInput": false,
              "inputType": null,
              "selected": null
            }, {
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "month",
              "milliseconds": 2592000000,
              "selected": "month"
            }]
          }
        }],
        "selectedProvider": "aws",
        "notes": ""
      }, {
        "instance": {
          "name": {"azure": "Storage", "aws": "AmazonSageMaker", "gcp": "Cloud Storage"},
          "categoryName": "Storage",
          "price": {
            "azure": {"value": "0.163", "unit": "1 GB/Month"},
            "aws": {"value": "0.1200000000", "unit": "GB-Mo"},
            "gcp": {"value": "0.000020000", "unit": "count"}
          },
          "fields": {"regionCode": {"value": "eu-central-2", "unit": ""}, "storageClass": {"value": "NA", "unit": ""}},
          "skus": ["DZH318Z0BP0B/001P/c299f2a3-596e-4d5b-b05c-d23b635c0f5d", "SHZPVCYCE8T2DP4X", "007A-40B7-63BC"]
        },
        "pricingInformation": {
          "azure": {"factor": 1, "price": 0.163},
          "aws": {"factor": 1, "price": 0.12},
          "gcp": {"factor": 1, "price": 0.00002}
        },
        "units": [{
          "providerName": "azure",
          "providerDefault": {
            "tokens": ["1", "GB", "/", "Month"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "token": "GB",
              "unitName": "StorageUnitCategorisation",
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "type": "string",
              "options": ["Byte", "Kilobyte", "Megabyte", "Gigabyte", "Terabyte", "Petabyte", "Exabyte"],
              "value": 8589934592,
              "selected": "Gigabyte"
            }, {
              "token": "/",
              "unitName": "DivisionUnitCategorisation",
              "options": null,
              "type": "division",
              "acceptsUserInput": false,
              "inputType": null,
              "selected": null
            }, {
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "month",
              "milliseconds": 2592000000,
              "selected": "month"
            }]
          },
          "configuration": {
            "tokens": ["1", "GB", "/", "Month"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "token": "GB",
              "unitName": "StorageUnitCategorisation",
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "type": "string",
              "options": ["Byte", "Kilobyte", "Megabyte", "Gigabyte", "Terabyte", "Petabyte", "Exabyte"],
              "value": 8589934592,
              "selected": "Gigabyte"
            }, {
              "token": "/",
              "unitName": "DivisionUnitCategorisation",
              "options": null,
              "type": "division",
              "acceptsUserInput": false,
              "inputType": null,
              "selected": null
            }, {
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "month",
              "milliseconds": 2592000000,
              "selected": "month"
            }]
          }
        }, {
          "providerName": "aws",
          "providerDefault": {
            "tokens": ["GB", "-", "Mo"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "token": "GB",
              "unitName": "StorageUnitCategorisation",
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "type": "string",
              "options": ["Byte", "Kilobyte", "Megabyte", "Gigabyte", "Terabyte", "Petabyte", "Exabyte"],
              "value": 8589934592,
              "selected": "Gigabyte"
            }, {
              "token": "-",
              "unitName": "DivisionUnitCategorisation",
              "options": null,
              "type": "division",
              "acceptsUserInput": false,
              "inputType": null,
              "selected": null
            }, {
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "month",
              "milliseconds": 2592000000,
              "selected": "month"
            }]
          },
          "configuration": {
            "tokens": ["1", "GB", "/", "Month"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "token": "GB",
              "unitName": "StorageUnitCategorisation",
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "type": "string",
              "options": ["Byte", "Kilobyte", "Megabyte", "Gigabyte", "Terabyte", "Petabyte", "Exabyte"],
              "value": 8589934592,
              "selected": "Gigabyte"
            }, {
              "token": "/",
              "unitName": "DivisionUnitCategorisation",
              "options": null,
              "type": "division",
              "acceptsUserInput": false,
              "inputType": null,
              "selected": null
            }, {
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "month",
              "milliseconds": 2592000000,
              "selected": "month"
            }]
          }
        }, {
          "providerName": "gcp",
          "providerDefault": {
            "tokens": ["count"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "token": "count",
              "unitName": "CustomUnitCategorisation",
              "options": null,
              "type": "string",
              "acceptsUserInput": false,
              "inputType": null,
              "selected": null,
              "value": "ambiguous"
            }]
          },
          "configuration": {
            "tokens": ["count"],
            "categories": [{
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            }, {
              "token": "count",
              "unitName": "CustomUnitCategorisation",
              "options": null,
              "type": "string",
              "acceptsUserInput": false,
              "inputType": null,
              "selected": null,
              "value": "ambiguous"
            }]
          }
        }],
        "selectedProvider": "gcp",
        "notes": ""
      }] as any
    )
  }
}
