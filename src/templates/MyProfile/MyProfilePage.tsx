'use client';

import { useEffect, useState } from 'react';
import ProfileForm from '../../components/myProfile/ProfileForm';
import { Customer } from '@/types/Customer';
import { Employee } from '@/types/Employee';

const MyProfilePage = () => {
    const [user, setUser] = useState<Customer | null>(null);

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:8080/customer/5`, {
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
            <h1>Mine Oplysninger</h1>
           {user && <ProfileForm user={user} setUser={setUser} />}
        </div>
    )
}

export default MyProfilePage;