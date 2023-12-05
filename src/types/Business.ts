import { Address } from "./Address";
import { BusinessAccountDetails } from "./BusinessAccountDetails";

export type Business = {
    id: number;
    name: string;
    openingTime: string;
    closingTime: string;
    cvr: string;
    address: Address;
    businessAccountDetails: BusinessAccountDetails;
    isCustomersFreeToBook: boolean;
    lastModifiedDate: Date;
    timeOfCreation: Date;
    version: number;
}