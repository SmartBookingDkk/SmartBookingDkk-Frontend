import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { BookingInvoice } from '@/types/BookingInvoice';

const PaidInvoices = () => {

    const [paidInvoices, setPaidInvoices] = useState<BookingInvoice[] | []>([])

    const getInvoices = async () => {
        const response = await fetch('http://localhost:8080/api/v1/invoice/paidInvoices/1', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json()
        setPaidInvoices(data)
    }


    useEffect(() => {
        getInvoices()
    }, [])

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
                {paidInvoices.map((invoice: BookingInvoice) => (
                        <TableRow key={invoice.id}>

                            <TableCell>{invoice.id}</TableCell>
                            <TableCell>{invoice.createdDate}</TableCell>
                            <TableCell>{invoice.dueDate}</TableCell>
                            <TableCell>{invoice.discount}</TableCell>
                            <TableCell>{invoice.isPaid}</TableCell>
                            <TableCell>{invoice.note}</TableCell>
                            <TableCell>{invoice.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default PaidInvoices