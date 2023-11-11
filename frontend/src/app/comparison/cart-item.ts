export interface CartItem {
    name: string;
    price: {
        [vendor: string]: { value: number, unit: string; };
    };
    fields: {
        [fieldName: string]: {
            value: string | number;
            unit: string;
        };
    };
}
