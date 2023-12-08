import React, { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import InvoiceInputFields from './InvoiceInputFields/InvoiceInputFields';
import TotalPriceAndNote from './InvoiceInputFields/TotalPriceAndNote';
import { Customer } from '@/types/Customer';
import { Booking } from '@/types/Booking';
import { useRouter } from 'next/navigation';
import { BookingInvoice } from '@/types/BookingInvoice';


type CreateInvoiceButtonProps = {
    onCreateInvoice: (newInvoice: BookingInvoice) => void;
}

const CreateInvoiceButton = ({ onCreateInvoice  }: CreateInvoiceButtonProps) => {

    const router = useRouter();
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
    const [invoiceNote, setInvoiceNote] = useState<string>("");
    const [totalPrice, setTotalPrice] = useState<number>(0);

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
        try {
            const response = await fetch(`http://localhost:8080/booking/customerId/${selectedCustomer?.id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }

            const data = await response.json();

            // Ensure data is an array, even if it's empty
            const bookingsArray = Array.isArray(data) ? data : [];

            setBookings(bookingsArray);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setBookings([]); // Set to an empty array in case of an error
        }
    };

    const handleBookingSelect = (booking: Booking) => {
        setSelectedBooking(booking)
    }

    const handleInvoiceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const invoice = {
            id: invoiceNumber,
            price: totalPrice,
            discount: invoiceDiscount,
            isVat: invoiceVAT,
            createdDate: invoiceCreationDate,
            dueDate: invoiceDueDate,
            booking: selectedBooking,
            note: invoiceNote,
            business: {
                id: 1
            },
            version: 0
        };

        try {
            const response = await fetch('http://localhost:8080/api/v1/invoice/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(invoice),
            
            });

            if (!response.ok) {
                throw new Error('Failed to create invoice');
            }

            const newInvoice = await response.json();
            onCreateInvoice(newInvoice);
         

        } catch (error) {
            console.error('Error creating invoice:', error);
        }

    };

    useEffect(() => {
        getCustomers()
    }, [])

    useEffect(() => {
        getBooking()
    }, [selectedCustomer]);

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
                            <form onSubmit={handleInvoiceSubmit}>

                                <ModalHeader className="flex flex-col gap-1">Opret Faktura</ModalHeader>
                                <ModalBody >

                                    <div className='flex w-full justify-center items-center'>

                                        <div className='w-1/2 flex justify-center'>

                                            <Select
                                                isRequired
                                                label="Vælg Kunde"
                                                placeholder="Vælg Kunde"
                                                className="max-w-xs"
                                            >

                                                {customers ? customers?.map((customer) => (
                                                    <SelectItem onClick={() => handleCustomerSelect(customer)} key={customer.id} value={customer.id}>
                                                        {customer.firstName + " " + customer.lastName}
                                                    </SelectItem>
                                                )) : <SelectItem key={0} isReadOnly>Ingen Kunder</SelectItem>}

                                            </Select>

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
                                            <Select
                                                isRequired
                                                label="Vælg Bookinger"
                                                placeholder="Vælg Bookinger"
                                                selectionMode="single"
                                                className="max-w-xs"
                                            >
                                                {selectedCustomer && bookings ? (
                                                    bookings.map((booking) => (
                                                        <SelectItem onClick={() => handleBookingSelect(booking)} key={booking.id}>
                                                            {booking.bookingStartTime}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem key={0} isReadOnly>
                                                        Ingen Bookinger
                                                    </SelectItem>
                                                )}
                                            </Select>
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
                                            invoiceNote={invoiceNote}
                                            setInvoiceNote={setInvoiceNote}
                                            invoicePrice={invoicePrice}
                                            invoiceAmount={invoiceAmount}
                                            invoiceVAT={invoiceVAT}
                                            invoiceDiscount={invoiceDiscount}
                                            totalPrice={totalPrice}
                                            setTotalPrice={setTotalPrice}
                                        />
                                    </div>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onClick={onClose}>
                                        Annuller
                                    </Button>
                                    <Button type='submit' color="primary" onClick={onClose}>
                                        Opret Faktura <FaCheck />
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal >


        </>
    )
}

export default CreateInvoiceButton