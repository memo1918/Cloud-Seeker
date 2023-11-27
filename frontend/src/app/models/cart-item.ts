import {InstanceComparison} from "./instance-comparison";
import {Unit} from "../pricing/unit";

export interface CartItem {
  pricingInformation: { [providerName: string]: { factor: number, price: number } };
  instance: InstanceComparison;
  units: {providerName: string, providerDefault: Unit, configuration: Unit};
  selectedProvider: string;
  notes: string;
}
