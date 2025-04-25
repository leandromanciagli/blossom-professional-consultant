import { Professional } from './Professional.model';
import { Topic } from './Topic.model';

export class Course {
    id: string;
    title: string;
    descrip: string;
    professional: Professional;
    topic: Topic;
    price: string;
    duration: string;
    imageCover: string;
    videoPreview: string;

    constructor(item: any) {
        this.id = item.id;
        this.title = item.title.rendered ?? item.title;
        this.descrip = item.descrip ?? item.acf?.descrip;
        this.price = item.price ?? item.acf?.price;
        this.duration = item.duration ?? item.acf?.duration;
        this.imageCover = item.image_cover ?? item.acf?.image_cover;
        this.videoPreview = item.video_preview ?? item.acf?.video_preview;
        this.professional = new Professional(item.professional_data[0]);
        this.topic = new Topic(item.taxonomies_data.topic[0]);
    }
}

