"use client";

import React, { useEffect, useState } from 'react'


import Revenue from '@/components/Invoices/Revenue';
import OutstandingInvoices from '@/components/Invoices/OutstandingInvoices';
import PaidInvoices from '@/components/Invoices/PaidInvoices';
import CreateInvoiceButton from '@/components/Invoices/CreateInvoiceButton';
import { BookingInvoice } from '@/types/BookingInvoice';



const InvoicePage = () => {

  const [unPaidInvoices, setUnPaidInvoices] = useState<BookingInvoice[] | []>([])
  const [paidInvoices, setPaidInvoices] = useState<BookingInvoice[] | []>([])

  const getUnPaidInvoices = async () => {
    const response = await fetch('http://localhost:8080/api/v1/invoice/unpaidInvoices/1', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    setUnPaidInvoices(data)
  }

  const handleMarkAsPaid = async (id: number) => {
    // Call the API to mark the invoice as paid (similar to your existing logic)
    const response = await fetch(`http://localhost:8080/api/v1/invoice/markAsPaid/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Update the state after marking as paid
      const updatedUnPaidInvoices = unPaidInvoices.filter((invoice: BookingInvoice) => invoice.id !== id);
      setUnPaidInvoices(updatedUnPaidInvoices);

      // Move the marked invoice to the paid invoices state
      const markedInvoice = unPaidInvoices.find((invoice: BookingInvoice) => invoice.id === id);
      if (markedInvoice) {
        setPaidInvoices([...paidInvoices, markedInvoice]);
      }
    } else {
      console.error('Failed to mark invoice as paid');
    }
  };


  useEffect(() => {

    getUnPaidInvoices()

  }, [])



  const getPaidInvoices = async () => {
    const response = await fetch('http://localhost:8080/api/v1/invoice/paidInvoices/1', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    setPaidInvoices(data)
  }

  useEffect(() => {

      getPaidInvoices()
    
  }, [])


  const handleCreateInvoice = async (newInvoice: BookingInvoice) => {
    setUnPaidInvoices([...unPaidInvoices, newInvoice]);
  };


  return (
    <>
      <CreateInvoiceButton  onCreateInvoice={handleCreateInvoice} unPaidInvoices={unPaidInvoices} setUnPaidInvoices={setUnPaidInvoices} />
      <div className='flex flex-col items-center'>
        <div>
          <Revenue />
        </div >
        <div className="flex justify-center">
          <h1 className=' mb-10 text-[24px]'>Udestående Fakturaer</h1>
        </div>
        <div className='flex justify-center mb-20'>
          <OutstandingInvoices onMarkAsPaid={handleMarkAsPaid} unPaidInvoices={unPaidInvoices} />
        </div>
        <div className='flex justify-center'>
          <h1 className='mb-10 text-[24px]'>Betalte Fakturaer</h1>
        </div>
        <div className='flex justify-center mb-20'>
          <PaidInvoices paidInvoices={paidInvoices} />
        </div>
      </div>


    </>

  )

}

export default InvoicePage