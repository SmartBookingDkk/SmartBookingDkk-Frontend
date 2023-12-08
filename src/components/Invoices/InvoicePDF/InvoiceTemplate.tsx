import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { BookingInvoice } from '@/types/BookingInvoice';

type InvoiceTemplateProps = {
  invoiceData: BookingInvoice;
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
});

const InvoiceTemplate = ({ invoiceData }: InvoiceTemplateProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={{ height: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: '20px' }}>

        <View style={{ display: 'flex', flexDirection: 'column' }}>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '20px' }}>
            <Image style={{ height: '40px', width: '40px' }} src="/images/dinforandringLogo.png" />
            <Text style={{ fontSize: '14px', marginLeft: '5px' }}>Din Forandring</Text>
          </View>

          <View style={{ marginHorizontal: '20px' }}>
            <Text style={{ fontSize: '14px', fontWeight: 'light' }}>Fakturanummer: <Text style={{ fontSize: '12px', fontWeight: 'extralight' }}>{invoiceData.id}</Text></Text>
            <Text style={{ fontSize: '14px', fontWeight: 'light' }}>Oprettelsesdato: <Text style={{ fontSize: '12px', fontWeight: 'extralight' }}>{invoiceData.createdDate.toString()}</Text></Text>
            <Text style={{ fontSize: '14px', fontWeight: 'light' }}>Forfaldsdato: <Text style={{ fontSize: '12px', fontWeight: 'extralight' }}>{invoiceData.dueDate.toString()}</Text></Text>
          </View>

        </View>

        <View>

          <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '20px' }}>
            <Text style={{ fontSize: '12px', fontWeight: 'light', paddingVertical: '4px' }}>Din Forandring</Text>
            <Text style={{ fontSize: '12px', fontWeight: 'light', paddingVertical: '4px' }}>CVR: 12345678</Text>
            <Text style={{ fontSize: '12px', fontWeight: 'light', paddingVertical: '4px' }}>Adresse: Ved Søen 2</Text>
            <Text style={{ fontSize: '12px', fontWeight: 'light', paddingVertical: '4px' }}>Postnummer: 2100</Text>
            <Text style={{ fontSize: '12px', fontWeight: 'light', paddingVertical: '4px' }}>By: København Ø</Text>
          </View>

        </View>

      </View>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '40px' }}>

        <View style={{ display: 'flex', flexDirection: 'column', width: '300px', height: '200px', marginHorizontal: '20px' }}>
          <Text style={{ fontSize: '14px', marginBottom: '10px' }}>Note:</Text>
          <View style={{ position: 'relative', border: 'solid 1px gray', backgroundColor: '#f2f2f2' }}>
            <Text style={{ padding: '10px', fontSize: '10px', fontWeight: 'extralight' }}>{invoiceData.note}</Text>
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '20px' }}>
          <Text style={{ padding: '10px', fontSize: '14px' }}>Beløb til betaling: <Text style={{}}>{invoiceData.price}</Text></Text>
        </View>

      </View>

      <View style={{ marginHorizontal: '40px', marginBottom: '40px'}}>
        <Text style={{ fontSize: '14px', fontWeight: 'light', marginHorizontal: '20px' }}>Betaling:</Text>
        <Text style={{ fontSize: '12px', fontWeight: 'light', marginHorizontal: '20px' }}>Reg. nr: 1234</Text>
        <Text style={{ fontSize: '12px', fontWeight: 'light', marginHorizontal: '20px' }}>Konto nr: 1234567890</Text>
      </View>

      <View style={{ marginHorizontal: '40px' }}>
        <Text style={{ fontSize: '14px', fontWeight: 'light', marginHorizontal: '20px' }}>Ved betaling skal fakturanummeret oplyses.</Text>
      </View>




    </Page>
  </Document>
);

export default InvoiceTemplate;
