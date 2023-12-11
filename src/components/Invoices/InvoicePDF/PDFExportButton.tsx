import React from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import InvoiceTemplate from './InvoiceTemplate';
import { FaRegFilePdf } from 'react-icons/fa6';
import { BookingInvoice } from '@/types/BookingInvoice';

type PDFExportButtonProps = {
    invoice: BookingInvoice;
};

const PDFExportButton = ({invoice}: PDFExportButtonProps) => {
    return (
        <div> 
            <PDFDownloadLink document={<InvoiceTemplate invoiceData={invoice} />} fileName={`Faktura_${invoice.id}`}>
            
                {({ loading }) =>
                    loading ? 'Loading document...' : 'Eksporter PDF'
                }
             
            </PDFDownloadLink>
        </div>
    );
};

export default PDFExportButton;