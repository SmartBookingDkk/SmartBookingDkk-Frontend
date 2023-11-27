import { Customer } from "@/types/Customer";
import { Employee } from "@/types/Employee";
import { Input } from "@nextui-org/input";
import { useState } from "react";

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
        <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap md:flex-nowrap gap-4">
                <Input type="email" value={user ? user.user.email : ""} label="Email" isDisabled />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                    type="text"
                    defaultValue={user?.firstName ? user.firstName : ""}
                    onChange={(e) => {
                        const newCustomer = { ...user, firstName: e.target.value };
                        setUser(newCustomer);
                    }}
                    label="Fornavn" />

                <Input
                    type="text"
                    defaultValue={user?.lastName ? user.lastName : ""}
                    onChange={(e) => {
                        const newCustomer = { ...user, lastName: e.target.value };
                        setUser(newCustomer);
                    }}
                    label="Efternavn" />
            </div>
            <button type="submit">Opdater dine oplysninger</button>
        </form>
    )
}

export default ProfileForm;