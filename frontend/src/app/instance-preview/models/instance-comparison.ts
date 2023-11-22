export interface InstanceComparison {
    name: string;
    price: {
        [vendor: string]: { value: number | string; unit: string };
    };
    fields: {
        [fieldName: string]: {
            value: string | number;
            unit: string;
        };
    };
    skus: string[];
}
