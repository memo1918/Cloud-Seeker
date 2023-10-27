export class Category {
    name: string;
    icon: string;
    description: string;
    fields: {
        name: string;
        options: (string | number)[];
        unit: string;
    }[];

    constructor(name: string, icon: string, description: string, fields: []) {
        this.name = name;
        this.icon = icon;
        this.description = description;
        this.fields = fields;
    }
}
