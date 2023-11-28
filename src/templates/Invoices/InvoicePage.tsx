"use client";

import React, { useContext } from 'react'

import { ResponsiveContext } from '@/contexts/MediaQueryContext'

const InvoicePage = () => {

  const { isMobile, isTablet, isDesktop } = useContext(ResponsiveContext);
  const [selected, setSelected] = React.useState<string>('Daglig');
  const [yearlyRevenue, setYearlyRevenue] = React.useState<number>(10000);
  const [monthlyRevenue, setMonthlyRevenue] = React.useState<number>(1000);
  const [weeklyRevenue, setWeeklyRevenue] = React.useState<number>(100);
  const [dailyRevenue, setDailyRevenue] = React.useState<number>(10);

  return (
    <div>

      {
        (isDesktop || isTablet) && (
          <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-10'>
            <div className='h-[120px] w-[220px] border border-gray-300 rounded-lg shadow-md flex flex-col items-center justify-center'>
              <h2 className='font-semibold text-[20px] mb-4'>Daglig Omsætning</h2>
              <div>
                <h3 className='text-[18px]'>{dailyRevenue} Dkk,-</h3>
              </div>
            </div>

            <div className='h-[120px] w-[220px] border border-gray-300 rounded-lg shadow-md flex flex-col items-center justify-center'>
              <h2 className='font-semibold text-[20px] mb-4'>Ugentlig Omsætning</h2>
              <div>
                <h3 className='text-[18px]'>{weeklyRevenue} Dkk,-</h3>
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
        )
        }

        {
          isMobile && (
            <div>
              <select>
                <option>Daglig</option>
                <option>Ugentlig</option>
                <option>Månedlig</option>
                <option>Årlig</option>
              </select>
              <div className='h-[120px] w-[220px] border border-gray-300 rounded-lg shadow-md flex flex-col items-center justify-center'>
              <h2 className='font-semibold text-[20px] mb-4'>Daglig Omsætning</h2>
              <div>
                <h3 className='text-[18px]'>6969 Dkk,-</h3>
              </div>
            </div>
            </div>
          )
        }

    </div>

  )

}

export default InvoicePage