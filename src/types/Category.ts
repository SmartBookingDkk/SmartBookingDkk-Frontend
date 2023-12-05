import { Business } from "./Business";

export type Category = {
    id: number;
    name: string;
    colorCode: string;
    hours: number;
    minutes: number;
    business: Business;
    createdDate: Date;
    lastModifiedDate: Date;
    version: number;
}