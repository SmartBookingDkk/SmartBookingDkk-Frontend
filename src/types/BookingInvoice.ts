import {Booking} from './Booking';

export type BookingInvoice = {
    id: number;
    price: number;
    dueDate: Date;
    note: string;
    isVat: boolean;
    discount: number;
    isPaid: boolean;
    booking: Booking;
    createdDate: Date;
    lastModifiedDate: Date;
    version: number;
}