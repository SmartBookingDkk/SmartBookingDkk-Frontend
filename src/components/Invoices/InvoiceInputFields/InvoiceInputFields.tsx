import React, { useState } from 'react'
import { Input, Checkbox } from "@nextui-org/react";
import TotalPriceAndNote from './TotalPriceAndNote';

type InvoiceInputFieldsProps = {
    invoiceAmount: string;
    invoicePrice: string;
    invoiceDiscount: string;
    invoiceVAT: boolean;
    setInvoiceAmount: React.Dispatch<React.SetStateAction<string>>;
    setInvoicePrice: React.Dispatch<React.SetStateAction<string>>;
    setInvoiceDiscount: React.Dispatch<React.SetStateAction<string>>;
    setInvoiceVAT: React.Dispatch<React.SetStateAction<boolean>>;
}

const InvoiceInputFields = ({invoiceAmount, invoicePrice, invoiceDiscount, invoiceVAT, 
    setInvoiceAmount, setInvoicePrice, setInvoiceDiscount, setInvoiceVAT}: InvoiceInputFieldsProps) => {

   

    console.log("Invoice amount: ", invoiceAmount, "Invoice Price: ", invoicePrice, "InvoiceDiscount: ", invoiceDiscount, "Invoice isVat: ", invoiceVAT)
    return (
        <>
            <div className="flex py-2 px-1 justify-around">
                <Input type='number' onChange={(e) => setInvoiceAmount(e.target.value)} children={invoiceAmount} placeholder='Antal' label="Antal" className='max-w-[80px]' />
                <Input type='text' onChange={(e) => setInvoicePrice(e.target.value)} value={invoicePrice} placeholder='eks. 1099.95' label="Pris eksl. moms" className='max-w-[180px]' />
                <Input type='text' onChange={(e) => setInvoiceDiscount(e.target.value)} value={invoiceDiscount} placeholder='eks. 15.0' label="Rabat %" className='max-w-[180px]' />
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

            

        </>
    )
}

export default InvoiceInputFields