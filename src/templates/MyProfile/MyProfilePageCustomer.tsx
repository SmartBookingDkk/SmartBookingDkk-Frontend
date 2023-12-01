'use client';

import { useEffect, useState } from 'react';
import { Customer } from '@/types/Customer';
import BookingDisplayer from '@/components/myProfile/bookingDisplayers/BookingDisplayer';
import { Divider } from "@nextui-org/react";
import { fetchGet } from '@/utility/fetch/fetchGet';
import ProfileForm from '@/components/myProfile/ProfileForm';
import { Employee } from '@/types/Employee';
import { Booking } from '@/types/Booking';

const MyProfilePageCustomer = () => {
    const [user, setUser] = useState<Customer | Employee | null>(null);
    const [bookings, setBookings] = useState<Booking[] | null>(null);

    useEffect(() => {
        let ignore = false;
        (async () => {
            if (ignore) return;

            setUser(await fetchGet("http://localhost:8080/customer/1"))
        })();

        return () => {
            ignore = true;
        }
    }, [])

    useEffect(() => {
        let ignore = false;

        if (user?.id !== undefined) {
            (async () => {
                const customerBookingsData = await fetchGet(`http://localhost:8080/booking/customerId/${user?.id}`);

                if (!ignore) setBookings(customerBookingsData);

                if (user?.user?.roles?.find(role => role.toString() === "USER")) {
                    const customerBusinessess = await fetchGet(`http://localhost:8080/business/customerId/${user.id}`);
                    if (!ignore) setUser(cur => ({ ...cur, business: customerBusinessess } as Customer));
                }
            })();
        }

        return () => {
            ignore = true;
        }
    }, [user?.id])


    return (
        <div>
            <h1 className="text-[24px] text-center uppercase font-semibold">mine oplysninger</h1>
            {user && <ProfileForm user={user} setUser={setUser} submitUrl="http://localhost:8080/customer" />}
            <Divider className="my-4" />
            <h2 className="text-[16px] text-center uppercase font-semibold m-4">booking oversigt</h2>
            <Divider className="my-4" />
            {bookings && bookings.length > 0 && <BookingDisplayer bookings={bookings} user={user} />
                || <h2 className='text-center'>Ingen bookinger at vise</h2>}
        </div>
    )
}

export default MyProfilePageCustomer;