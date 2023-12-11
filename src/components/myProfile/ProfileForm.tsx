import { Customer } from "@/types/Customer";
import { AddressInput } from "./InputContainers/AddressInput";
import { PersonalInput } from "./InputContainers/PersonalInput";
import { Divider } from "@nextui-org/react";
import { fetchPut } from "@/utility/fetch/fetchPut";
import { Employee } from "@/types/Employee";

interface ProfileFormProps<T> {
    user: T;
    setUser: React.Dispatch<React.SetStateAction<T>>;
    submitUrl: string;
}

const ProfileForm= ({ user, setUser, submitUrl }: ProfileFormProps<Customer | Employee | null>) => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) return;

        console.log("PROFILEFORM FETCHPUT RETURN: ", await fetchPut(submitUrl, user));
    }

    return (
        <form onSubmit={handleSubmit} className="m-4">

            {user && <>
                {user.user && <PersonalInput user={user} setUser={setUser} />}

                <AddressInput user={user} setUser={setUser} />
                <div className="flex justify-center m-8">
                    <button className="btn-primary capitalize mb-8" type="submit">gem mine ændringer</button>
                </div>
            </>}

        </form>
    )
}

export default ProfileForm;