import { Customer } from "@/types/Customer";
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/react";

interface PersonalInputProps {
    user: Customer;
    setUser: React.Dispatch<Customer>;
}

export const PersonalInput = ({ user, setUser }: PersonalInputProps) => {

    return (
        <>
        <Divider className="my-4" />
            <div className="flex flex-wrap md:flex-nowrap gap-4 m-4">
                <Input type="email" value={user ? user.user.email : ""} label="Email" isDisabled />
                <Input
                    type="phone"
                    defaultValue={user?.phone && user.phone.length > 0 ? user.phone : "0045 xxx xxxx"}
                    onChange={(e) => {
                        const newCustomer = { ...user, phone: e.target.value };
                        setUser(newCustomer);
                    }}
                    label="Tlf. nr." />
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-4 m-4">
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
        </>
    )
}