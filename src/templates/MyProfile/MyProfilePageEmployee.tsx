"use client"

import ProfileForm from "@/components/myProfile/ProfileForm";
import BookingDisplayer from "@/components/myProfile/bookingDisplayers/BookingDisplayer";
import { Booking } from "@/types/Booking";
import { Customer } from "@/types/Customer";
import { Employee } from "@/types/Employee";
import { fetchGet } from "@/utility/fetch/fetchGet";
import { Divider } from "@nextui-org/react";
import { use, useEffect, useState } from "react";


const MyProfilePageEmployee = () => {
    const [user, setUser] = useState<Employee | Customer | null>(null);
    const [bookings, setBookings] = useState<Booking[] | null>(null);

    useEffect(() => {
        let ignore = false;
        (async () => {
            const employeeData = await fetchGet("http://localhost:8080/employee/1");
            if (!ignore) setUser(employeeData);
        })();

        return () => {
            ignore = true;
        }
    }, [])

    useEffect(() => {
        let ignore = false;

        if (user?.id !== undefined) {
            (async () => {
                const employeeBookingsData = await fetchGet(`http://localhost:8080/booking/${user?.id}`);
                if (!ignore) setBookings(employeeBookingsData);
            })();
        }

        return () => {
            ignore = true;
        }
    }, [user])

    return (
        <div>
            <h1 className="text-[24px] text-center uppercase font-semibold">mine oplysninger</h1>
            {user && <ProfileForm user={user} setUser={setUser} submitUrl="http://localhost:8080/employee" />}
            <Divider className="my-4" />
            <h2 className="text-[16px] text-center uppercase font-semibold m-4">booking oversigt</h2>
            <Divider className="my-4" />
            {bookings && bookings.length > 0 &&
                <BookingDisplayer
                    bookings={bookings as Booking[]}
                    user={user}
                />
                || <h2 className='text-center'>Ingen bookinger at vise</h2>}
        </div>
    )
}

export default MyProfilePageEmployee;