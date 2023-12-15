import { InstanceComparison } from "./instance-comparison";
import { Unit } from "../pricing/unit";
import { Units } from "../pricing/units";

export interface CartItem {
  pricingInformation: { [providerName: string]: { factor: number, price: number } };
  instance: InstanceComparison;
  providers: { providerName: string, providerDefault: Unit, configuration: Unit }[];
  providerForm: { providerName: string, providerDefault: Unit, configuration: Unit }[];
  selectedProvider: string;
  notes: string;
  numberOfInstances: number;
}

export interface StorageCartItem {
  skus: string[];
  selectedProvider: string;
  notes: string;
  numberOfInstances: number;
  providers: { providerName: string, providerDefault: string, configuration: string }[];
}

export function updatePricingInformation(cartItem: CartItem) {
  cartItem.pricingInformation = calculatePricingInformation(cartItem.providers, cartItem.instance);
}

function calculatePricingInformation(providers: {
  providerName: string;
  providerDefault: Unit;
  configuration: Unit
}[], instance: InstanceComparison) {
  let pricingInformation: { [provider: string]: { factor: number, price: number } } = {};

  for (const provider of providers) {
    let factor = provider.providerDefault.getFactorForConversion(provider.configuration);
    pricingInformation[provider.providerName] = {
      factor,
      price: Number(instance.price[provider.providerName].value) * factor
    };
  }

  return pricingInformation;
}

function findCompatibleUnits(pricingConfigurations: {
  providerName: string;
  providerDefault: Unit;
  configuration: Unit
}[]) {
  let displayPricingConfigurations: { providerName: string, providerDefault: Unit, configuration: Unit }[] = [];

  defaultConfigurationLoop: for (const pricingConfiguration of pricingConfigurations) {
    for (const displayPricingConfiguration of displayPricingConfigurations) {
      if (pricingConfiguration.configuration.isCompatible(displayPricingConfiguration.configuration)) {
        pricingConfiguration.configuration = displayPricingConfiguration.configuration;
        displayPricingConfiguration.providerName += "/" + pricingConfiguration.providerName;
        continue defaultConfigurationLoop;
      }
    }
    displayPricingConfigurations.push({ ...pricingConfiguration });
  }
  return displayPricingConfigurations;
}

function getPriceConfigurationFromInstance(instance: InstanceComparison) {
  let pricingConfigurations: { providerName: string, providerDefault: Unit, configuration: Unit }[] = [];

  for (const priceKey in instance.price) {
    const price = instance.price[priceKey];
    pricingConfigurations.push({
      providerName: priceKey,
      providerDefault: Units.categorise(price.unit),
      configuration: Units.categorise(price.unit)
    });
  }
  return pricingConfigurations;
}

export function findCheapestProvider(pricingInformation: { [p: string]: { factor: number; price: number } }) {
  let selectedProvider: string | null = null;

  for (const pricingElementKey in pricingInformation) {
    let pricingElement = pricingInformation[pricingElementKey];
    if (selectedProvider == null || pricingElement.price < pricingInformation[selectedProvider].price) {
      selectedProvider = pricingElementKey;
    }
  }
  return selectedProvider!;
}

export function createCartItemFromInstance(instance: InstanceComparison): CartItem {
  let pricingConfigurations = getPriceConfigurationFromInstance(instance);
  let displayPricingConfigurations = findCompatibleUnits(pricingConfigurations);
  let pricingInformation = calculatePricingInformation(pricingConfigurations, instance);
  let selectedProvider = findCheapestProvider(pricingInformation);

  return {
    notes: "",
    numberOfInstances: 1,
    instance: instance,
    providers: pricingConfigurations,
    providerForm: displayPricingConfigurations,
    selectedProvider: selectedProvider!,
    pricingInformation: pricingInformation
  };
}

function getPriceConfigurationFromStorage(storage: StorageCartItem) {
  let pricingConfigurations: { providerName: string, providerDefault: Unit, configuration: Unit }[] = [];
  for (const unit of storage.providers) {
    pricingConfigurations.push({
      providerName: unit.providerName,
      providerDefault: Units.categorise(unit.providerDefault),
      configuration: Units.categorise(unit.configuration)
    });
  }
  return pricingConfigurations;
}

function assertInstanceStorageCompatibility(instancePricingConfigurations: {
  providerName: string;
  providerDefault: Unit;
  configuration: Unit
}[], storagePricingConfiguration: {
  providerName: string;
  providerDefault: Unit;
  configuration: Unit
}[], instance: InstanceComparison) {
  for (const instancePricingConfiguration of instancePricingConfigurations) {
    let storage = storagePricingConfiguration.find(spc => spc.providerName == instancePricingConfiguration.providerName);
    if (!storage) {
      let message1 = `Provider "${instancePricingConfiguration.providerName}" not found.`;
      console.log({
        message: message1,
        storage,
        instance,
        instancePricingConfigurations,
        storagePricingConfiguration
      });
      throw new Error(message1);
    }

    if (!instancePricingConfiguration.configuration.isCompatible(storage.configuration)) {
      let message = `Unit "${instancePricingConfiguration.configuration.getUnitString()}" not compatible to "${storage.configuration.getUnitString()}".`;
      console.log({
        message: message,
        storage,
        instance,
        instancePricingConfigurations,
        storagePricingConfiguration
      });
      throw new Error(message);
    }
  }
}

export function createCartItemFromStorageAndInstance(storage: StorageCartItem, instance: InstanceComparison): CartItem {
  let instancePricingConfigurations = getPriceConfigurationFromInstance(instance);
  let storagePricingConfiguration = getPriceConfigurationFromStorage(storage);

  assertInstanceStorageCompatibility(instancePricingConfigurations, storagePricingConfiguration, instance);

  let displayPricingConfigurations = findCompatibleUnits(storagePricingConfiguration);
  let pricingInformation = calculatePricingInformation(storagePricingConfiguration, instance);
  let selectedProvider = findCheapestProvider(pricingInformation);

  return {
    notes: storage.notes,
    numberOfInstances: storage.numberOfInstances,
    instance: instance,
    providers: storagePricingConfiguration,
    providerForm: displayPricingConfigurations,
    selectedProvider: storage.selectedProvider!,
    pricingInformation: pricingInformation
  };
}

export function cartItemToStorageCartItem(item: CartItem): StorageCartItem {
  return {
    providers: item.providers.map(i => ({
      providerName: i.providerName,
      providerDefault: i.providerDefault.getUnitString(),
      configuration: i.configuration.getUnitString()
    })),
    selectedProvider: item.selectedProvider,
    numberOfInstances: item.numberOfInstances,
    notes: item.notes,
    skus: item.instance.skus
  };
}
