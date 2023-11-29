import { User } from './User';
import { Business } from './Business';
import { Customer } from './Customer';
import { Booking } from './Booking';

export type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    phon: string;
    user: User;
    business: Business | null;
    customers: Customer[] | null;
    bookings: Booking[] | null;
    createdDate: Date;
    lastModifiedDate: Date;
    version: number;
}