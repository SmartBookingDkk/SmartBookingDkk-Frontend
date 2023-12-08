"use client";

import { ResponsiveContext } from '@/contexts/MediaQueryContext';
import React, { useContext } from 'react'

const Revenue = () => {

    
    const { isMobile, isTablet, isDesktop } = useContext(ResponsiveContext);
   
    


    const [selected, setSelected] = React.useState<string>("");
    const [yearlyRevenue, setYearlyRevenue] = React.useState<number>(10000);
    const [monthlyRevenue, setMonthlyRevenue] = React.useState<number>(1000);
    const [weeklyRevenue, setWeeklyRevenue] = React.useState<number>(100);
    const [dailyRevenue, setDailyRevenue] = React.useState<number>(10);

    const getSelectedRevenue = () => {
        switch (selected) {
            case 'Daglig':
                return dailyRevenue;
            case 'Ugentlig':
                return weeklyRevenue;
            case 'Månedlig':
                return monthlyRevenue;
            case 'Årlig':
                return yearlyRevenue;
            default:
                return 0;
        }
    };
    return (
        <div className='flex w-full justify-center mt-10 mb-20'>

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
                                <h3 className='text-[18px]'>{monthlyRevenue} Dkk,-</h3>
                            </div>
                        </div>

                        <div className='h-[120px] w-[220px] border border-gray-300 rounded-lg shadow-md flex flex-col items-center justify-center'>
                            <h2 className='font-semibold text-[20px] mb-4'>Årlig Omsætning</h2>
                            <div>
                                <h3 className='text-[18px]'>{yearlyRevenue} Dkk,-</h3>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                isMobile && (
                    <div className='flex flex-col items-center'>
                        <select onChange={(e) => setSelected(e.target.value)}>
                            <option value="Daglig">Daglig</option>
                            <option value="Ugentlig">Ugentlig</option>
                            <option value="Månedlig">Månedlig</option>
                            <option value="Årlig">Årlig</option>
                        </select>

                        <div className='h-[120px] w-[220px] border border-gray-300 rounded-lg shadow-md flex flex-col items-center justify-center'>
                            <h2 className='font-semibold text-[20px] mb-4'>{selected} Omsætning</h2>
                            <div>
                                <h3 className='text-[18px]'>{getSelectedRevenue()} Dkk,-</h3>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default Revenue