import { Customer } from "@/types/Customer";
import { AddressInput } from "./InputContainers/AddressInput";
import { PersonalInput } from "./InputContainers/PersonalInput";
import { Divider } from "@nextui-org/react";

interface ProfileFormProps {
    user: Customer;
    setUser: React.Dispatch<Customer>;
}

const ProfileForm = ({ user, setUser }: ProfileFormProps) => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/customer", {
                method: "PUT",
                //mode: "cors", // no-cors, *cors, same-origin
                credentials: "include", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                console.log("User data updated successfully: ", await response.json());
            } else {
                console.error("Failed to update user data");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="m-4">
            
                <PersonalInput user={user} setUser={setUser} />

                <AddressInput user={user} setUser={setUser} />
                <div className="flex justify-center m-8">
                    <button className="btn-primary capitalize mb-8" type="submit">gem mine ændringer</button>
                </div>
            
        </form>
    )
}

export default ProfileForm;