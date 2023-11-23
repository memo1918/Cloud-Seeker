import {Category} from "../category/models/Category";

export const SAMPLE_CATEGORY: Category = {
    "name": "Compute",
    "icon": "Computer",
    "description": "test",
    "fields": [
        {
            "name": "cores",
            "options": [],
            "unit": "Cores",
          "type": "dropdown"
        },
        {
            "name": "storage",
            "options": [],
            "unit": "GB",
          "type": "dropdown"
        },
        {
            "name": "memory",
            "options": [],
            "unit": "GB",
          "type": "dropdown"
        }
    ],
};

export const SAMPLE_CATEGORY2: Category = {
    "name": "Database",
    "icon": "Database",
    "description": "test2",
    "fields": [
        {
            "name": "cores",
            "options": [],
            "unit": "Cores",
          "type": "dropdown"
        },
        {
            "name": "storage",
            "options": [],
            "unit": "GB",
          "type": "dropdown"
        },
        {
            "name": "memory",
            "options": [],
            "unit": "GB",
          "type": "dropdown"
        }
    ],
};
