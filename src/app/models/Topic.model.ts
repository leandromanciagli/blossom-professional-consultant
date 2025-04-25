export class Topic {
    id: number;
    name: string;

    constructor(item: any) {
        this.id = item.id;
        this.name = item.name;
    }
}
