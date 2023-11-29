"use client";

import React from 'react'


import Revenue from '@/components/Invoices/Revenue';
import OutstandingInvoices from '@/components/Invoices/OutstandingInvoices';
import PaidInvoices from '@/components/Invoices/PaidInvoices';
import CreateInvoiceButton from '@/components/Invoices/CreateInvoiceButton';



const InvoicePage = () => {




  return (
    <>
    <CreateInvoiceButton />
    
      <div className='flex flex-col items-center'>
        <div>
          <Revenue />
        </div >
        <div className="flex justify-center">
          <h1 className=' mb-10 text-[24px]'>Udestående Fakturaer</h1>
        </div>
        <div className='flex justify-center mb-20'>
          <OutstandingInvoices />
        </div>
        <div className='flex justify-center'>
          <h1 className='mb-10 text-[24px]'>Betalte Fakturaer</h1>
        </div>
        <div className='flex justify-center mb-20'>
          <PaidInvoices />
        </div>
      </div>


    </>

  )

}

export default InvoicePage