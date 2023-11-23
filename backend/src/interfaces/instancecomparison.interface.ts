export interface InstanceComparison {
    name: { [vendor: string]: string };
    categoryName: string;
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
