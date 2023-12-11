import { User } from './User';
import { Business } from './Business';
import { Customer } from './Customer';
import { Booking } from './Booking';
import { Address } from './Address';

export type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    user: User;
    business: Business | null;    
    address: Address;
    bookings: Booking[] | null;
    createdDate: Date;
    lastModifiedDate: Date;
    version: number;
}