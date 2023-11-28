import {User} from './User';
import {Business} from './Business';
import {Customer} from './Customer';
import {Booking} from './Booking';

export type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phon: string;
    user: User;
    business: Business;
    customers: Customer[];
    bookings: Booking[];
     createdDate: Date;
    lastModifiedDate: Date;
    version: number;
}