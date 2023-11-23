import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {InstanceComparison} from "./models/instance-comparison";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private items: BehaviorSubject<InstanceComparison[]> = new BehaviorSubject<InstanceComparison[]>([])

  constructor() {
    this.setItems([
      {
        "name": {"aws":"Compute"},
        "categoryName": "Compute",
        "price": {
          "azure": {
            "value": "0.51607",
            "unit": "1 Hour"
          },
          "aws": {
            "value": "1.4720000000",
            "unit": "Hrs"
          },
          "gcp": {
            "value": "0.076432",
            "unit": "Hours"
          }
        },
        "fields": {
          "cores": {
            "value": "32",
            "unit": ""
          },
          "memory": {
            "value": "256 GiB",
            "unit": ""
          },
          "regionCode": {
            "value": "us-east-2",
            "unit": ""
          },
          "operatingSystem": {
            "value": "Windows",
            "unit": ""
          },
          "storage": {
            "value": "EBS only",
            "unit": ""
          },
          "gpuMemory": {
            "value": "NA",
            "unit": ""
          },
          "clockSpeed": {
            "value": "NA",
            "unit": ""
          }
        },
        "skus": [
          "DZH318Z096SR/Standard_E64s_v5/39c020f9-4583-544b-9488-af34c670b3c1",
          "FW8E5RQ44WYXEWXN",
          "generated-n2-highcpu-8"
        ]
      },

      ]
    )
  }

  setItems(newItems: InstanceComparison[]){
    this.items.next(newItems);
  }

  getItems(){
    return this.items.getValue();
  }

  getItemsObserver(){
    return this.items.asObservable();
  }


}
