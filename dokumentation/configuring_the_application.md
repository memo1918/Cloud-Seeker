# Configuring the application

## Category template

The category template looks like this:

```json5
[
  {
    // name of the category
    "name": "Computing",
    // icon of the category
    "icon": "computer",
    // description of the category not used in the current version
    "description": "test",
    // here we define the vendors available for this category
    "vendors": [
      {
        // name of the vendor
        "name": "aws",
        // here we define the columns of the vendor the columns are merged with the columns of other vendors to create a mapped instance (`instancecomparison`)
        "columns": {
          // the key is the name of the column
          "cores": {
            // the path to the value in the instance object
            "path": [
              "attributes",
              "vcpu"
            ],
            // conversion not used in the current version
            "conversion": {}
          },
          // additional entries
        }
      },
      {
        "name": "gcp",
        // columns can be empty if the vendor does not have the column the results are merged with other vendors
        "columns": {
        }
      }
      // additional entries
    ],
    // here we define all available fields for a category
    // the order of the fields is the order the fields are displayed in the ui
    "fields": [
      {
        // name of the field (key of the vendor columns)
        "name": "cores",
        // options are filled with distinct values of the available filtering options on runtime
        "options": [],
        // unit of the field
        "unit": "Cores",
        // type of the field (number or dropdown)
        // number fields are displayed as sliders and number inputs
        // dropdown fields are displayed as dropdowns
        "type": "number"
      },
      {
        "name": "regionCode",
        "options": [],
        "unit": "",
        "type": "dropdown"
      }
      // additional entries
    ],
    // discovery is used to determine the service is part of the category
    // each vendor has a discovery object that is used to compare instances of that specific vendor
    "discovery": {
      // the key is the name of the vendor
      "aws": {
        // e.g. the value of the key `productFamily` has to be `Compute Instance` for a instance from aws to be part of the category
        // key: path to the value in the instance object
        "key": [
          "productFamily"
        ],
        // possible values of the key to be considered part of the category connected by or
        "value": [
          "Compute Instance"
        ]
      },
      "azure": {
        "key": [
          "productFamily"
        ],
        "value": [
          "Compute"
        ]
      },
      // additional entries
    }
  }
  // additional entries
]
```

We need to write the category template for each category according to the comments in the template.

## Mapping CSV

The mapping CSV looks like this:

```csv
azure,aws,google
DZH318Z0CSHB/Standard_E16-4ds_v4/b79c3e44-d17d-58a9-b1eb-da09ed48af83,ZGR6DNXRR5737GXS,generated-n2d-highcpu-32
CRC8UP36GSCYTHBZ,DZH318Z0BJRN/008Q/484b0f43-74f0-4ca3-bb6c-75f5a723f1ed,02DA-7F03-3624
```

The first line contains the names of the vendors.

The following lines contain the mapped instances. The instances are mapped by the sku. In one line should be equivalent
to each other. The order of the vendors is not important, because the vendor is saved in the instance object and
retrieved during the mapping.

## Applying the configuration

The configuration can by applied by saving it multiple files and mounting those files into the container.

The paths to the files in the container should be set in the environment variables `DUMMY_CSV_IMPORT`
and `CATEGORY_TEMPLATES`.