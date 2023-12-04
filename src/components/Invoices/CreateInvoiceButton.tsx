import React, { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import InvoiceInputFields from './InvoiceInputFields/InvoiceInputFields';
import TotalPriceAndNote from './InvoiceInputFields/TotalPriceAndNote';
import { Customer } from '@/types/Customer';
import { Booking } from '@/types/Booking';



const CreateInvoiceButton = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [bookings, setBookings] = useState<Booking[] | null>([]);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [invoiceNumber, setInvoiceNumber] = useState<number>(0);
    const [invoiceAmount, setInvoiceAmount] = useState<string>("");
    const [invoicePrice, setInvoicePrice] = useState<string>("");
    const [invoiceDiscount, setInvoiceDiscount] = useState<string>("");
    const [invoiceVAT, setInvoiceVAT] = useState<boolean>(false);
    const [invoiceCreationDate, setInvoiceCreationDate] = useState<string>("");
    const [invoiceDueDate, setInvoiceDueDate] = useState<string>("");

    const [customers, setCustomers] = useState<Customer[] | null>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    const handleCustomerSelect = (customer: Customer) => {
        setSelectedCustomer(customer)
    }


    const getCustomers = async () => {
        const response = await fetch('http://localhost:8080/customer/customers/1', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json()
        setCustomers(data)
    }

    const getBooking = async () => {
        const response = await fetch('http://localhost:8080/booking/customerId/1', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json()
        setBookings(data)
    }

    const handleBookingSelect = (booking: Booking) => {
        setSelectedBooking(booking)
    }

    useEffect(() => {
        getCustomers()
    }, [])

    useEffect(() => {
        getBooking()
    },[selectedCustomer]);

    return (
        <>

            <div className='flex justify-end mx-8 sm:mt-2 my-4'>
                <button onClick={onOpen} className='btn-primary'>Opret Faktura +</button>
            </div>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                size="3xl"

            >

                <ModalContent className='h-full overflow-y-scroll no-scrollbar'>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Opret Faktura</ModalHeader>
                            <ModalBody >

                                <div className='flex w-full justify-center items-center'>

                                    <div className='w-1/2 flex justify-center'>
                                        {customers?.map((customer) => (
                                            <Select
                                                isRequired
                                                label="Vælg Kunde"
                                                placeholder="Vælg Kunde"
                                                className="max-w-xs"
                                                onChange={() => handleCustomerSelect(customer)}
                                            >


                                                <SelectItem key={customer.id} value={customer.id}>
                                                    {customer.firstName + " " + customer.lastName}
                                                </SelectItem>

                                            </Select>
                                        ))}
                                    </div>

                                    <div className='flex w-1/2 justify-center'>


                                        {selectedCustomer === null ? <p>Vælg Kunde</p> : (
                                            <div className='flex flex-col'>
                                                <p>{selectedCustomer?.firstName + " " + selectedCustomer?.lastName}</p>
                                                <p>{selectedCustomer?.user.email}</p>
                                                <p>{selectedCustomer?.address.streetName + " " + selectedCustomer?.address.number}</p>
                                                <p>{selectedCustomer?.address.postalCode + " " + selectedCustomer?.address.city}</p>
                                            </div>
                                        )

                                        }



                                    </div>

                                </div>


                                <div className='flex w-full justify-center items-center my-6'>

                                    <div className='w-1/2 flex justify-center'>
                                    {bookings?.map((booking) => (
                                        <Select
                                            label="Vælg Bookinger"
                                            placeholder="Vælg Bookinger"
                                            selectionMode="single"
                                            className="max-w-xs"
                                            onChange={() => handleBookingSelect(booking)}
                                        >
                                            
                                                <SelectItem key={booking.id}>{booking.bookingStartTime}</SelectItem>
                                          
                                        </Select>
                                          ))}
                                    </div>

                                    <div className='flex w-1/2 justify-center'>
                                        {selectedBooking === null ? <p>Vælg Bookinger</p> : <div className='flex flex-col w-1/2 justify-center'>
                                            <p>{selectedBooking.bookingStartTime}</p>
                                        </div>}
                                        
                                    </div>

                                </div>

                                <div className='flex flex-col'>

                                    <InvoiceInputFields
                                        invoiceNumber={invoiceNumber}
                                        invoiceAmount={invoiceAmount}
                                        invoicePrice={invoicePrice}
                                        invoiceDiscount={invoiceDiscount}
                                        invoiceVAT={invoiceVAT}
                                        invoiceCreationDate={invoiceCreationDate}
                                        invoiceDueDate={invoiceDueDate}
                                        setInvoiceNumber={setInvoiceNumber}
                                        setInvoiceAmount={setInvoiceAmount}
                                        setInvoicePrice={setInvoicePrice}
                                        setInvoiceDiscount={setInvoiceDiscount}
                                        setInvoiceVAT={setInvoiceVAT}
                                        setInvoiceCreationDate={setInvoiceCreationDate}
                                        setInvoiceDueDate={setInvoiceDueDate}
                                    />
                                    <div className='flex justify-center my-4'>
                                        <button className='transform ease-in-out duration-300 hover:scale-110 hover:opacity-100 text-[25px] opacity-60'>
                                            <FiPlusCircle />
                                        </button>
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