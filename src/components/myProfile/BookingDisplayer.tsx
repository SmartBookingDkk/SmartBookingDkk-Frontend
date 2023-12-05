import { Booking } from "@/types/Booking";
import { Divider } from "@nextui-org/react";
import BookingCard from "./BookingCard";

interface BookingCardProps {
    bookings: Booking[];
}

const BookingDisplayer = ({ bookings }: BookingCardProps) => {
    console.log(bookings.length);

    return (
        <>
            <Divider className="my-4"/>
            <h2 className="text-[16px] text-center uppercase font-semibold m-4">booking oversigt</h2>
            <Divider className="my-4" />
            <div className="flex justify-center flex-wrap">
                {bookings.map(booking => {
                    return (
                        <BookingCard booking={booking} />
                    )
                })}
            </div>
        </>
    )
};


export default BookingDisplayer;