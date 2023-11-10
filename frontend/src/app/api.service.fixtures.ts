export const SAMPLE_CATEGORIES = [
    {
        "name": "Compute",
        "icon": "Computer",
        "description": "test",
        "vendors": [
            {
                "name": "aws",
                "columns": {
                    "cores": {
                        "path": "attributes.vcpu",
                        "conversion": {}
                    },
                    "storage": {
                        "path": "attributes.storage",
                        "conversion": {}
                    },
                    "memory": {
                        "path": "attributes.memory",
                        "conversion": {}
                    }
                }
            },
            {
                "name": "gcp",
                "columns": {
                    "cores": {
                        "path": "attributes.machineType",
                        "conversion": "/-[1-9]*$/"
                    },
                    "storage": {
                        "path": null,
                        "conversion": "Get it from somewhere else"
                    },
                    "memory": {
                        "path": null,
                        "conversion": {}
                    }
                }
            },
            {
                "name": "azure",
                "columns": {
                    "cores": {
                        "path": null,
                        "conversion": {}
                    },
                    "storage": {
                        "path": null,
                        "conversion": {}
                    },
                    "memory": {
                        "path": null,
                        "conversion": {}
                    }
                }
            }
        ],
        "fields": [
            {
                "name": "cores",
                "options": [],
                "unit": "Cores"
            },
            {
                "name": "storage",
                "options": [],
                "unit": "GB"
            },
            {
                "name": "memory",
                "options": [],
                "unit": "GB"
            }
        ],
        "discovery": {
            "aws": {
                "key": "productFamily",
                "value": [
                    "Compute Instance"
                ]
            },
            "gcp": {
                "key": "productFamily",
                "value": [
                    "Compute Instance"
                ]
            },
            "azure": {
                "key": "productFamily",
                "value": [
                    "Compute"
                ]
            }
        }
    }
]