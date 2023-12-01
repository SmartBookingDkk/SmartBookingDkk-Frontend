'use client';

import { useEffect, useState } from 'react';
import { Customer } from '@/types/Customer';
import BookingDisplayer from '@/components/myProfile/bookingDisplayers/BookingDisplayer';
import { Divider } from "@nextui-org/react";
import { fetchGet } from '@/utility/fetch/fetchGet';
import ProfileForm from '@/components/myProfile/ProfileForm';
import { Employee } from '@/types/Employee';

const MyProfilePageCustomer = () => {
    const [user, setUser] = useState<Customer | Employee | null>(null);

    useEffect(() => {
        (async () => {
            setUser(await fetchGet("http://localhost:8080/customer/4"))
        })();
    }, [])

    return (
        <div>
            <h1 className="text-[24px] text-center uppercase font-semibold">mine oplysninger</h1>        
            {user && <ProfileForm user={user} setUser={setUser} submitUrl="http://localhost:8080/customer" />}
            <Divider className="my-4" />
            <h2 className="text-[16px] text-center uppercase font-semibold m-4">booking oversigt</h2>
            <Divider className="my-4" />
            {user?.bookings && user.bookings.length > 0 && <BookingDisplayer bookings={user.bookings} />
                || <h2 className='text-center'>Ingen bookinger at vise</h2>}
            {/* <BookingDisplayer bookings={user?.bookings && user.bookings.length > 0 ? user.bookings : bookingsMocked} /> */}
        </div>
    )
}

export default MyProfilePageCustomer;