import { Address } from "./Address";
import { Business } from "./Business";
import { Employee } from "./Employee";
import { User } from "./User";
import { Note } from "./Note";
import { Booking } from "./Booking";

export type Customer = {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    user: User;
    address: Address;
    business: Business[];
    employee: Employee;
    bookings: Booking[] | null;
    signupRequestMessage: string;
    acceptedTimeStamp: Date;
    createdDate: Date;
    lastModifiedDate: Date;
    version: number;
}