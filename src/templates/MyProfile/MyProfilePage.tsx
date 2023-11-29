'use client';

import { useEffect, useState } from 'react';
import ProfileForm from '../../components/myProfile/ProfileForm';
import { Customer } from '@/types/Customer';
import { Employee } from '@/types/Employee';
import BookingDisplayer from '@/components/myProfile/BookingDisplayer';
import bookingsMock from "@/mocks/bookingsMocked";
import bookingsMocked from '@/mocks/bookingsMocked';

const MyProfilePage = () => {
    const [user, setUser] = useState<Customer | null>(null);

    useEffect(() => {        
        (async () => {
            const response = await fetch(`http://localhost:8080/customer/4`, {
                credentials: 'include',
            });

            if (!response.ok) return;
            const data = await response.json();
            console.log("DATA: ", data);
            setUser(data)
        })()
    }, [])

    return (
        <div>
            <h1 className="text-[24px] text-center uppercase font-semibold">mine oplysninger</h1>
            {user && <ProfileForm user={user} setUser={setUser} />}
            <BookingDisplayer bookings={user?.bookings && user.bookings.length > 0 ? user.bookings : bookingsMocked} />
        </div>
    )
}

export default MyProfilePage;