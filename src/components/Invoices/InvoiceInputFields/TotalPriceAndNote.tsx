import React from 'react'
import { Textarea } from "@nextui-org/react";

type TotalPriceAndNoteProps = {
    invoicePrice: string;
    invoiceAmount: string;
    invoiceVAT: boolean;
    invoiceDiscount: string;
}

const TotalPriceAndNote = ({invoicePrice, invoiceAmount, invoiceVAT, invoiceDiscount} : TotalPriceAndNoteProps) => {

    let totalPrice = 0;
    return (
        
        <div className="flex justify-between items-center my-6" >
            <Textarea
                label="Note"
                placeholder="Skriv en note til fakturaen"
                className="max-w-xs"
            />

            <div className='mr-10'>
                <p className='text-right'>Pris: <span>{invoicePrice ? Number(invoicePrice) * Number(invoiceAmount) : "0"}</span>,-</p>
                <p className='text-right'>Moms udgør: <span>{invoiceVAT ? (1.25 * Number(invoicePrice) * Number(invoiceAmount) - Number(invoicePrice) * Number(invoiceAmount)) : "0"}</span>,-</p>
                <p className='text-right underline underline-offset-4'>Total Pris:<span> </span>
                    <span>
                        {
                            invoiceVAT ?
                                ( totalPrice = ((1.25 * Number(invoicePrice)) * Number(invoiceAmount)) - ((1.25 * Number(invoicePrice)) * Number(invoiceAmount) / 100 * Number(invoiceDiscount))).toFixed(2)
                                :
                                ( totalPrice = (Number(invoicePrice) * Number(invoiceAmount)) - (Number(invoicePrice) * Number(invoiceAmount) / 100 * Number(invoiceDiscount))).toFixed(2)
                        }
                    </span>
                    ,-</p>
            </div>
        </div>
            )
}

            export default TotalPriceAndNote