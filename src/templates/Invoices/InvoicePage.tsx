"use client";

import React, {useContext} from 'react'

import { ResponsiveContext } from '@/contexts/MediaQueryContext'

const InvoicePage = () => {

  const { isMobile, isTablet, isDesktop} = useContext(ResponsiveContext);
  return (
    <div>

      <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-10'>

        <div className='h-[120px] w-[220px] border border-gray-300 rounded-lg shadow-md flex flex-col items-center justify-center'>
          <h2 className='font-semibold text-[20px] mb-4'>Daglig Omsætning</h2>
          
          {isTablet &&
          <div>
             <h3 className='text-[18px]'>6969 Dkk,-</h3>
        
          </div>
}
        </div>

        <div className='h-[120px] w-[220px] border border-gray-300 rounded-lg shadow-md flex flex-col items-center justify-center'>
          <h2 className='font-semibold text-[20px] mb-4'>Ugentlig Omsætning</h2>
          <div>
            <h3 className='text-[18px]'>6969 Dkk,-</h3>
          </div>
        </div>

        <div className='h-[120px] w-[220px] border border-gray-300 rounded-lg shadow-md flex flex-col items-center justify-center'>
          <h2 className='font-semibold text-[20px] mb-4'>Månedlig Omsætning</h2>
          <div>
            <h3 className='text-[18px]'>6969 Dkk,-</h3>
          </div>
        </div>

        <div className='h-[120px] w-[220px] border border-gray-300 rounded-lg shadow-md flex flex-col items-center justify-center'>
          <h2 className='font-semibold text-[20px] mb-4'>Årlig Omsætning</h2>
          <div>
            <h3 className='text-[18px]'>6969 Dkk,-</h3>
          </div>
        </div>
      </div>

    </div>

  )

}

export default InvoicePage