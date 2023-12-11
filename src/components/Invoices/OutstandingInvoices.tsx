import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button } from "@nextui-org/react";
import { BookingInvoice } from '@/types/BookingInvoice';
import { BsThreeDots } from "react-icons/bs";
import { FaRegTrashCan, FaRegFilePdf } from "react-icons/fa6";
import { MdOutlinePaid } from "react-icons/md";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import PDFExportButton from './InvoicePDF/PDFExportButton';





type OutstandingInvoicesProps = {
    unPaidInvoices: BookingInvoice[] | [];
    onMarkAsPaid: (id: number) => void;
}

const OutstandingInvoices = ({ unPaidInvoices, onMarkAsPaid }: OutstandingInvoicesProps) => {


    const handleMarkAsPaid = async (id: number) => {
        onMarkAsPaid(id);
    };

   



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
                    <TableColumn className='flex justify-center items-center'>Actions</TableColumn>

                </TableHeader>
                <TableBody>
                    {unPaidInvoices.length > 0 ? (
                        unPaidInvoices.map((invoice: BookingInvoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell>{invoice.id}</TableCell>
                                <TableCell>{invoice.createdDate.toString()}</TableCell>
                                <TableCell>{invoice.dueDate.toString()}</TableCell>
                                <TableCell>{invoice.discount}</TableCell>
                                <TableCell>{invoice.isPaid ? "Betalt" : "Ikke Betalt"}</TableCell>
                                <TableCell>{invoice.note}</TableCell>
                                <TableCell>{invoice.price}</TableCell>
                                <TableCell className='flex justify-center'>

                                    <Popover placement="right">

                                        <PopoverTrigger>
                                            <Button className=' w-3 h-5 bg-white hover:scale-110'><BsThreeDots /></Button>
                                        </PopoverTrigger>

                                        <PopoverContent>

                                            <div className="flex flex-col w-[180px] px-1 py-2">

                                                <button
                                                    onClick={() => handleMarkAsPaid(invoice.id)}
                                                    className='flex items-center text-[14px] py-2 hover:bg-[#f0f0f0] hover:scale-110 px-2 rounded-lg'>
                                                    <MdOutlinePaid className="mr-4" />Marker som betalt
                                                </button>

                                                <button className='flex items-center text-[14px] py-2 hover:bg-[#f0f0f0] hover:scale-110 px-2 rounded-lg'>
                                                    <FaRegTrashCan className="mr-4" style={{ color: 'red' }} />Slet Faktura
                                                </button>

                                                
                                                <button className='flex items-center text-[14px] py-2 hover:bg-[#f0f0f0] hover:scale-110 px-2 rounded-lg'>
                                                <FaRegFilePdf className="mr-4" /><PDFExportButton invoice={invoice}/>

                                            </button>

                                        </div>

                                    </PopoverContent>
                                </Popover>

                            </TableCell>
                            </TableRow>
                ))
                ) : (
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
                    <TableCell>
                        Der er ingen fakturaer
                    </TableCell>
                </TableRow>
                    )}
            </TableBody>
        </Table>
        </div >
    );
};

export default OutstandingInvoices