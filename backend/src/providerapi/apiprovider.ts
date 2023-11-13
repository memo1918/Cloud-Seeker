import { BaseApi } from "./baseapi";
import { IService } from "../db/models/services";
import _ from "lodash";
import { AwsApi } from "./aws";
import { AzureApi } from "./azure";
import { GcpApi } from "./gcp";

export class UnknownProviderError extends Error {
}

export class ApiProvider {
    private static instance: ApiProvider;

    static getInstance(): ApiProvider {
        if (!this.instance) this.instance = new ApiProvider();
        return this.instance;
    }

    private constructor() {
    }

    private apis: { [name: string]: BaseApi } = {};

    register(api: BaseApi) {
        this.apis[api.name] = api;
    }

    getProvider(instance: IService) {
        if (_.isNil(this.apis[instance.name]))
            throw new UnknownProviderError(
                `Provider ${instance.name} is not available. Options: ${JSON.stringify(Object.keys(this.apis))}`
            );
        return this.apis[instance.name];
    }
}

export function registerAllProviders() {
    ApiProvider.getInstance().register(new AwsApi());
    ApiProvider.getInstance().register(new AzureApi());
    ApiProvider.getInstance().register(new GcpApi());
}
