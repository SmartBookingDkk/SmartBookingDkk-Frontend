import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";

const OutstandingInvoices = () => {




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
                    <TableRow>
                        <TableCell>Test nummer</TableCell>
                        <TableCell>Test Oprettelsesdato</TableCell>
                        <TableCell>Test Forfaldsdato</TableCell>
                        <TableCell>Test Rabat %</TableCell>
                        <TableCell>Test Status</TableCell>
                        <TableCell>Test Note</TableCell>
                        <TableCell>Test Beløb</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default OutstandingInvoices