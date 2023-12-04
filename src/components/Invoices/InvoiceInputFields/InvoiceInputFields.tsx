import React, { useState } from 'react'
import { Input, Checkbox } from "@nextui-org/react";
import TotalPriceAndNote from './TotalPriceAndNote';

type InvoiceInputFieldsProps = {
    invoiceNumber: number;
    invoiceAmount: string;
    invoicePrice: string;
    invoiceDiscount: string;
    invoiceVAT: boolean;
    invoiceCreationDate: string;
    invoiceDueDate: string;
    setInvoiceNumber: React.Dispatch<React.SetStateAction<number>>;
    setInvoiceAmount: React.Dispatch<React.SetStateAction<string>>;
    setInvoicePrice: React.Dispatch<React.SetStateAction<string>>;
    setInvoiceDiscount: React.Dispatch<React.SetStateAction<string>>;
    setInvoiceVAT: React.Dispatch<React.SetStateAction<boolean>>;
    setInvoiceCreationDate: React.Dispatch<React.SetStateAction<string>>;
    setInvoiceDueDate: React.Dispatch<React.SetStateAction<string>>;
}

const InvoiceInputFields = ({ invoiceNumber, invoiceAmount, invoicePrice, invoiceDiscount, invoiceVAT, invoiceCreationDate, invoiceDueDate,
   setInvoiceNumber, setInvoiceAmount, setInvoicePrice, setInvoiceDiscount, setInvoiceVAT, setInvoiceCreationDate, setInvoiceDueDate }: InvoiceInputFieldsProps) => {


    return (
        <>
            <div className="flex flex-col py-2 px-1 justify-center">

                <h2 className='text-center my-2'>Faktura Information</h2>

                <div className='flex flex-col w-full border-y-2 border-gray-200'>

                    <div className='flex w-full justify-between items-center my-4'>

                        <Input
                            type='number'
                            className='max-w-[180px]'
                            onChange={(e) => setInvoiceNumber(e.target.valueAsNumber)}
                            children={invoiceNumber}
                            label="Faktura nr."
                            placeholder='Faktura nr.'
                        />

                        <Input
                            type='date'
                            className='max-w-[180px]'
                            onChange={(e) => setInvoiceCreationDate(e.target.value)}
                            children={invoiceCreationDate}
                            label="Oprettelsesdato"
                            placeholder='dd-mm-yyyy'
                        />

                        <Input
                            type='date'
                            className='max-w-[180px]'
                            onChange={(e) => setInvoiceDueDate(e.target.value)}
                            children={invoiceDueDate}
                            label="Forfaldsdato"
                            placeholder='dd-mm-yyyy'
                        />

                    </div>

                    <div className='flex w-full items-center justify-between my-4'>

                        <Input
                            type='number'
                            onChange={(e) => setInvoiceAmount(e.target.value)}
                            children={invoiceAmount}
                            placeholder='Antal'
                            label="Antal"
                            className='max-w-[80px]'
                        />

                        <Input
                            type='text'
                            onChange={(e) => setInvoicePrice(e.target.value)}
                            children={invoicePrice}
                            placeholder='eks. 1099.95'
                            label="Pris eksl. moms"
                            className='max-w-[180px]'
                        />

                        <Input
                            type='text'
                            onChange={(e) => setInvoiceDiscount(e.target.value)}
                            children={invoiceDiscount}
                            placeholder='eks. 15.0'
                            label="Rabat %"
                            className='max-w-[180px]'
                        />

                        <Checkbox
                            classNames={{
                                label: "text-sm",
                            }}
                            isSelected={invoiceVAT}
                            onValueChange={() => setInvoiceVAT(!invoiceVAT)}
                        >
                            Inkl. Moms
                        </Checkbox>
                    </div>
                </div>


            </div>



        </>
    )
}

export default InvoiceInputFields