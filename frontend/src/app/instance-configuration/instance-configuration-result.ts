import { Unit } from "../pricing/unit";

export interface InstanceConfigurationResult {
  units: { providerName: string; providerDefault: Unit; configuration: Unit }[];
  adjustedPricing: { price: number; factor: number; providerName: string }[];
  notes: string;
  numberOfInstances: number;
}
