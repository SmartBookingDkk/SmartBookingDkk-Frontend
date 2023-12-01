import { Category } from "./Category";
import { Customer } from "./Customer";
import { Employee } from "./Employee";
import {BookingInvoice} from './BookingInvoice';


export type Booking = {
    id: number;
    bookingStartTime: string;
    bookingEndTime: string;
    bookingDate: number;
    location: string;
    category: Category;
    invoice: BookingInvoice;
    createdDate: Date;
    lastModifiedDate: Date;
    version: number;
}