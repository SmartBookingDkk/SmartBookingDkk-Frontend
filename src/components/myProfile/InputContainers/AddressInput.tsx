import { Customer } from "@/types/Customer";
import { Employee } from "@/types/Employee";
import { Divider, Input } from "@nextui-org/react";

interface AddressInputProps {
    user: Customer | Employee;
    setUser: React.Dispatch<Customer | Employee>;
}

export const AddressInput = ({ user, setUser }: AddressInputProps) => {
    return (
        <>
        <h2 className="text-[16px] text-center uppercase font-semibold mt-8">adresse</h2>
            <Divider className="my-4" />
            <div className="flex flex-wrap md:flex-nowrap gap-4 m-4">
                <Input
                    type="text"
                    defaultValue={user?.address && user.address.streetName && user.address.streetName.length > 0 ? user.address.streetName : ""}
                    onChange={(e) => {
                        const newCustomer = { ...user, address: {...user.address, streetName: e.target.value} };
                        setUser(newCustomer);
                    }}
                    label="Gadenavn" />

                <Input
                    type="text"
                    defaultValue={user?.address && user.address.number && user.address.number.length > 0 ? user.address.number : "eks. 24 4. 2th"}
                    onChange={(e) => {
                        const newCustomer = { ...user, address: {...user.address, number: e.target.value} };
                        setUser(newCustomer);
                    }}
                    label="Husnummer (etage nr. og placering)" />
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-4 m-4">
                <Input
                    type="text"
                    defaultValue={user?.address && user.address.city && user?.address.city.length > 0 ? user.address.city : ""}
                    onChange={(e) => {
                        const newCustomer = { ...user, address: {...user.address, city: e.target.value} };
                        setUser(newCustomer);
                    }}
                    label="By" />

                <Input
                    type="text"
                    defaultValue={user?.address && user.address.postalCode ? user.address.postalCode : ""}
                    onChange={(e) => {
                        const newCustomer = { ...user, address: {...user.address, postalCode: e.target.value} };
                        setUser(newCustomer);
                    }}
                    label="Postkode" />

            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-4 m-4">
            <Input
                    type="text"
                    defaultValue={user?.address && user.address.country ? user.address.country : ""}
                    onChange={(e) => {
                        const newCustomer = { ...user, address: {...user.address, country: e.target.value} };
                        setUser(newCustomer);
                    }}
                    label="Land" />
            </div>
        </>
    )
}