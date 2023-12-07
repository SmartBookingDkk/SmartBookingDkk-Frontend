import React from 'react'
import { Textarea } from "@nextui-org/react";

type TotalPriceAndNoteProps = {
    invoicePrice: string;
    invoiceAmount: string;
    invoiceVAT: boolean;
    invoiceDiscount: string;
    invoiceNote: string;
    setInvoiceNote: (value: string) => void;
    setTotalPrice: (value: number) => void;
    totalPrice: number;
}

const TotalPriceAndNote = ({invoicePrice, invoiceAmount, invoiceVAT, invoiceDiscount, invoiceNote, setInvoiceNote, totalPrice, setTotalPrice} : TotalPriceAndNoteProps) => {


    const calculatedPrice = invoiceVAT ?
        ((1.25 * Number(invoicePrice)) * Number(invoiceAmount)) - ((1.25 * Number(invoicePrice)) * Number(invoiceAmount) / 100 * Number(invoiceDiscount))
        :
        (Number(invoicePrice) * Number(invoiceAmount)) - (Number(invoicePrice) * Number(invoiceAmount) / 100 * Number(invoiceDiscount));

    setTotalPrice(calculatedPrice);
    return (
        
        <div className="flex justify-between items-center my-6" >
            <Textarea
                label="Note"
                placeholder="Skriv en note til fakturaen"
                className="max-w-xs"
                value={invoiceNote}
                onChange={(e) => setInvoiceNote(e.target.value)}
            />

            <div className='mr-10'>
                <p className='text-right'>Pris: <span>{invoicePrice ? Number(invoicePrice) * Number(invoiceAmount) : "0"}</span>,-</p>
                <p className='text-right'>Moms udgør: <span>{invoiceVAT ? (1.25 * Number(invoicePrice) * Number(invoiceAmount) - Number(invoicePrice) * Number(invoiceAmount)) : "0"}</span>,-</p>
                <p className='text-right underline underline-offset-4'>Total Pris:<span> </span>
                    <span>
                       {calculatedPrice.toFixed(2)}
                    </span>
                    ,-</p>
            </div>
        </div>
            )
}

            export default TotalPriceAndNote