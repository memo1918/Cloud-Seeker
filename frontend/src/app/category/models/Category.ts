export interface Category {
    name: string;
    icon: string;
    description: string;
    fields: {
        name: string;
        options: (string | number)[];
        unit: string;
    }[];
}
