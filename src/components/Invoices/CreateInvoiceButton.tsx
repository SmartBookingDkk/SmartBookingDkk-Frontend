import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import InvoiceInputFields from './InvoiceInputFields/InvoiceInputFields';
import TotalPriceAndNote from './InvoiceInputFields/TotalPriceAndNote';



const CreateInvoiceButton = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const bookings = ["Booking 23/11-2023", "Booking 23/12-2023"]
    const [booking, setBooking] = React.useState("");

    const [invoiceAmount, setInvoiceAmount] = useState<string>("");
    const [invoicePrice, setInvoicePrice] = useState<string>("");
    const [invoiceDiscount, setInvoiceDiscount] = useState<string>("");
    const [invoiceVAT, setInvoiceVAT] = useState<boolean>(false);

    return (
        <>

            <div style={{ zIndex: 1 }} className='flex justify-end mx-8 sm:mt-2  my-4'>
                <button onClick={onOpen} className='btn-primary'>Opret Faktura +</button>
            </div>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                size="2xl"
            >
                <ModalContent >
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Opret Faktura</ModalHeader>
                            <ModalBody >
                                <div className='flex justify-between items-center my-6'>
                                    <Select
                                        isRequired
                                        label="Vælg Kunde"
                                        placeholder="Vælg Kunde"
                                        defaultSelectedKeys={["James Smith"]}
                                        className="max-w-xs"
                                    >
                                        <SelectItem key={"James Smith"}>James Smith</SelectItem>
                                    </Select>
                                    <div className='flex flex-col w-1/2 justify-center ml-20'>
                                        <p>John Smith</p>
                                        <p>John.Smith@gmail.com</p>
                                        <p>Sankt Kjelds Plads 4, 1 TH</p>
                                        <p>2100 København Ø</p>
                                    </div>
                                </div>


                                <div className='flex justify-between items-center my-6'>

                                    <Select
                                        label="Vælg Bookinger"
                                        placeholder="Vælg Bookinger"
                                        selectionMode="multiple"
                                        className="max-w-xs"
                                        onChange={(e) => setBooking(e.target.value)}
                                    >
                                        {bookings.map((booking) => (
                                            <SelectItem key={booking}>{booking}</SelectItem>
                                        ))}
                                    </Select>

                                    <div className='flex flex-col w-1/2 justify-center ml-20'>
                                        <p>{booking}</p>
                                    </div>

                                </div>

                                <div className='flex flex-col'>
                                    <InvoiceInputFields
                                        invoiceAmount={invoiceAmount}
                                        invoicePrice={invoicePrice}
                                        invoiceDiscount={invoiceDiscount}
                                        invoiceVAT={invoiceVAT}
                                        setInvoiceAmount={setInvoiceAmount}
                                        setInvoicePrice={setInvoicePrice}
                                        setInvoiceDiscount={setInvoiceDiscount}
                                        setInvoiceVAT={setInvoiceVAT}
                                    />
                                    <div className='flex justify-center my-4'>
                                        <button className='hover:scale-110 hover:opacity-100 text-[25px] opacity-60'><FiPlusCircle /></button>
                                    </div>

                                    <TotalPriceAndNote
                                        invoicePrice={invoicePrice}
                                        invoiceAmount={invoiceAmount}
                                        invoiceVAT={invoiceVAT}
                                        invoiceDiscount={invoiceDiscount}
                                    />
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onClick={onClose}>
                                    Annuller
                                </Button>
                                <Button color="primary" onClick={onClose}>
                                    Opret Faktura <FaCheck />
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


        </>
    )
}

export default CreateInvoiceButton