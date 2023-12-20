import { BaseApi } from "./baseapi";
import { IService } from "../db/models/services";
import _ from "lodash";
import { AwsApi } from "./aws";
import { AzureApi } from "./azure";
import { GcpApi } from "./gcp";

export class UnknownProviderError extends Error {}

// currently unused
// when we want to add a new provider we need to register it here
// the provider is registered by its name
export class ApiProvider {
    private static instance: ApiProvider;

    static getInstance(): ApiProvider {
        if (!this.instance) this.instance = new ApiProvider();
        return this.instance;
    }

    private constructor() {}

    private apis: { [name: string]: BaseApi } = {};

    register(api: BaseApi) {
        this.apis[api.name] = api;
    }

    // get the provider responsible for the provided service
    getProvider(instance: IService) {
        // if the provider is not registered throw an error
        // the vendor name is the name of the provider and used for comparison
        if (_.isNil(this.apis[instance.vendorName]))
            throw new UnknownProviderError(
                `Provider ${instance.name} is not available. Options: ${JSON.stringify(Object.keys(this.apis))}`
            );
        // return the provider
        return this.apis[instance.name];
    }
}

// currently unused
// when we want to add a new provider we need to register it here
export function registerAllProviders() {
    ApiProvider.getInstance().register(new AwsApi());
    ApiProvider.getInstance().register(new AzureApi());
    ApiProvider.getInstance().register(new GcpApi());
}
