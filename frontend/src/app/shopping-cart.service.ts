import {Injectable} from '@angular/core';
import {CartItem} from "./comparison/cart-item";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  public items: CartItem[] = [
    {
      "name": "Instancename",
      "price": {
        "aws": {
          "value": 0.4940000000, unit: "USD"
        },
        "gcp": {
          "value": 0.20176, unit: "USD"
        },
        "azure": {
          "value": 0.20176, unit: "USD"
        }
      },
      "fields": {
        "cpu": {
          "value": 8,
          "unit": "cors"
        },
        "memory": {value: 16, unit: "GiB"},
        "storage": {value: 200, unit: " NVMe SSD"}
      }
    },
    {
      "name": "Instancename5",
      "price": {
        "aws": {
          "value": 0.932,
          "unit": "USD"
        },
        "gcp": {
          "value": 0.614,
          "unit": "USD"
        },
        "azure": {
          "value": 0.759,
          "unit": "USD"
        }
      },
      "fields": {
        "cpu": {
          "value": 16,
          "unit": "cors"
        },
        "memory": {
          "value": 32,
          "unit": "GiB"
        },
        "storage": {
          "value": 300,
          "unit": "NVMe SSD"
        }
      }
    }
    , {
      "name": "Instancename4",
      "price": {
        "aws": {
          "value": 0.847,
          "unit": "USD"
        },
        "gcp": {
          "value": 0.541,
          "unit": "USD"
        },
        "azure": {
          "value": 0.686,
          "unit": "USD"
        }
      },
      "fields": {
        "cpu": {
          "value": 12,
          "unit": "cors"
        },
        "memory": {
          "value": 24,
          "unit": "GiB"
        },
        "storage": {
          "value": 250,
          "unit": "NVMe SSD"
        }
      }
    }
    , {
      "name": "Instancename3",
      "price": {
        "aws": {
          "value": 0.712,
          "unit": "USD"
        },
        "gcp": {
          "value": 0.392,
          "unit": "USD"
        },
        "azure": {
          "value": 0.577,
          "unit": "USD"
        }
      },
      "fields": {
        "cpu": {
          "value": 2,
          "unit": "cors"
        },
        "memory": {
          "value": 4,
          "unit": "GiB"
        },
        "storage": {
          "value": 50,
          "unit": "NVMe SSD"
        }
      }
    }
    , {
      "name": "Instancename2",
      "price": {
        "aws": {
          "value": 0.635,
          "unit": "USD"
        },
        "gcp": {
          "value": 0.327,
          "unit": "USD"
        },
        "azure": {
          "value": 0.498,
          "unit": "USD"
        }
      },
      "fields": {
        "cpu": {
          "value": 6,
          "unit": "cors"
        },
        "memory": {
          "value": 12,
          "unit": "GiB"
        },
        "storage": {
          "value": 150,
          "unit": "NVMe SSD"
        }
      }
    }
  ];

  constructor() {
  }
}
