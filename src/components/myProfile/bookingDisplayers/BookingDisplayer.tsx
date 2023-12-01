import { Booking } from "@/types/Booking";
import BookingCard from "./BookingCard";
import { Employee } from "@/types/Employee";
import { Customer } from "@/types/Customer";

interface BookingDisplayerProps {
    bookings: Booking[];
    user: Employee | Customer;
}

const BookingDisplayer = ({bookings, user}: BookingDisplayerProps) => {
    return (
        <>
            <div className="flex justify-center flex-wrap">
                {bookings && bookings.length > 0 && bookings.map(booking => {
                    return (
                        <BookingCard key={booking.id} booking={booking} user={user} />
                    )
                })}
            </div>
        </>
    )
};

export default BookingDisplayer;