import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { BookingInvoice } from '@/types/BookingInvoice';

type PaidInvoicesProps = {
    paidInvoices: BookingInvoice[] | [];
}

const PaidInvoices = ({paidInvoices} : PaidInvoicesProps) => {

    

    return (
        <div className='lg:w-[1200px] md:w-[800px] sm:w-[600px]'>
            <Table className='w-full' aria-label="Example table with dynamic content">
                <TableHeader>
                    <TableColumn>Fakturanummer</TableColumn>
                    <TableColumn>Oprettelsesdato</TableColumn>
                    <TableColumn>Forfaldsdato</TableColumn>
                    <TableColumn>Rabat %</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Note</TableColumn>
                    <TableColumn>Beløb</TableColumn>

                </TableHeader>
                <TableBody>
                {paidInvoices.length > 0 ? paidInvoices.map((invoice: BookingInvoice) => (
                        <TableRow key={invoice.id}>

                            <TableCell>{invoice.id}</TableCell>
                            <TableCell>{invoice.createdDate.toString()}</TableCell>
                            <TableCell>{invoice.dueDate.toString()}</TableCell>
                            <TableCell>{invoice.discount}</TableCell>
                            <TableCell>{invoice.isPaid ? "Ikke Betalt" : "Betalt"}</TableCell>
                            <TableCell>{invoice.note}</TableCell>
                            <TableCell>{invoice.price}</TableCell>
                        </TableRow>
                    ))
                    : 
                    
                    <TableRow>
                            <TableCell>
                                Der er ingen fakturaer
                            </TableCell>
                            <TableCell>
                                Der er ingen fakturaer
                            </TableCell>
                            <TableCell>
                                Der er ingen fakturaer
                            </TableCell>
                            <TableCell>
                                Der er ingen fakturaer
                            </TableCell>
                            <TableCell>
                                Der er ingen fakturaer
                            </TableCell>
                            <TableCell>
                                Der er ingen fakturaer
                            </TableCell>
                            <TableCell>
                                Der er ingen fakturaer
                            </TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default PaidInvoices