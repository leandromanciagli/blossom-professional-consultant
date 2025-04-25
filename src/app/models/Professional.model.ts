export class Professional {
    id: number;
    name: string;
    avatar: string;
    hobbies: string;

    constructor(item: any) {
        this.id = item.id;
        this.name = item.title.rendered ?? item.title;
        this.avatar = item.avatar ?? item.acf?.avatar;
        this.hobbies = item.hobbies ?? item.acf?.hobbies;
    }
}

