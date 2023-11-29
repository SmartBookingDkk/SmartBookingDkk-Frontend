import { Customer } from "@/types/Customer";
import { Employee } from "@/types/Employee";
import {Input} from "@nextui-org/react";
import { useState } from "react";

interface ProfileFormProps {
    customer: Customer;
    setCustomer: React.Dispatch<Customer>;
}

const ProfileForm = ({ customer, setCustomer }: ProfileFormProps) => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/customer", {
                method: "POST",
                //mode: "cors", // no-cors, *cors, same-origin
                credentials: "include", // include, *same-origin, omit
                headers: {
                  "Content-Type": "application/json",
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(customer),
            });
    
            if (response.ok) {
                console.log("Customer data updated successfully: ", await response.json());
            } else {            
                console.error("Failed to update customer data");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap md:flex-nowrap gap-4">
                <Input type="email" value={customer ? customer.user.email : ""} label="Email" isDisabled />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                    type="text"
                    defaultValue={customer?.firstName ? customer.firstName : ""}
                    onChange={(e) => {
                        const newCustomer = { ...customer, firstName: e.target.value };
                        setCustomer(newCustomer);
                    }}
                    label="Fornavn" />

                <Input
                    type="text"
                    defaultValue={customer?.lastName ? customer.lastName : ""}
                    onChange={(e) => {
                        const newCustomer = { ...customer, lastName: e.target.value };
                        setCustomer(newCustomer);
                    }}
                    label="Efternavn" />
            </div>
            <button type="submit">Opdater dine oplysninger</button>
        </form>
    )
}

export default ProfileForm;