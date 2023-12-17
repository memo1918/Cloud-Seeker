export const SAMPLE_CATEGORIES = [{
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
