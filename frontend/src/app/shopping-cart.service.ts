import { Injectable } from '@angular/core';
import { CartItem } from "./comparison/cart-item";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  public items: CartItem[] = [
    {
      "name": "Instancename",
      "price": {
        "aws": {
          "value": 0.4940000000, unit:"USD"
        },
        "gcp": {
          "value": 0.20176, unit:"USD"
        },
        "azure": {
          "value": 0.20176, unit:"USD"
        }
      },
      "fields": {
        "cpu": {
          "value": 8,
          "unit": "cors"
        },
        "memory": { value:16, unit:"GiB" },
        "storage":  {value: 200, unit:" NVMe SSD"}
      }
    }
  ];

  constructor() {
  }

  getItemsAsString(){
    return JSON.stringify(this.items)
  }
}
