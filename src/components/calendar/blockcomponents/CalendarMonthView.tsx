"use client";
import React, { useState } from 'react';
import getISOWeek from 'date-fns/getISOWeek';
import DayInMonth from './DayInMonth';
import startOfWeek from 'date-fns/startOfWeek';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import getWeeksInMonth from 'date-fns/getWeeksInMonth';
import { ResponsiveContext } from '@/contexts/MediaQueryContext';
import CalendarDayView from './CalendarDayView';


const daysinWeek: string[] = ['Mandag', 'Tirdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
const monthsInYear: string[] = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
const currentDate = new Date();


interface CalendarMonthViewProps {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isPortrait: boolean;
}



const CalendarMonthView: React.FC<CalendarMonthViewProps> = ({ isMobile, isTablet, isDesktop, isPortrait }) => {

    // UseState for selected date
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [showDayView, setShowDayView] = useState(false);


    // Context used for media queries
    //const { isMobile, isTablet, isDesktop, isPortrait } = React.useContext(ResponsiveContext);

    // An object used to set certain values for calculating the calender grid. Updates when the month is changed and renders the page
    const [monthInfo, setMonthInfo] = useState({
        monthsInYearIndex: currentDate.getMonth(),
        firstDayOfMonth: startOfMonth(currentDate),
        firstWeekOfMonth: getISOWeek(startOfMonth(currentDate)),
        lastWeekOfMonth: getISOWeek(endOfMonth(startOfMonth(currentDate))),
    });

    /**
     * Updates the DayCalender with with the pressed date.
     * @param clickedDate 
     */
    const handleDateClick = (clickedDate: Date) => {
        setShowDayView(true);
        setSelectedDate(clickedDate);

    };

    /** 
    * Function that handles the click on the arrows to change the month
    * @param monthSwapValue is the value that is added to the current month index, to swap the month
    */
    function handleChangeMonthClick(monthSwapValue: number) {
        setMonthInfo(prevDateInfo => {
            const newDate = new Date(prevDateInfo.firstDayOfMonth.getTime());
            newDate.setMonth(newDate.getMonth() + monthSwapValue);
            setShowDayView(false);
            return {
                monthsInYearIndex: newDate.getMonth(),
                firstDayOfMonth: newDate,
                firstWeekOfMonth: getISOWeek(newDate),
                lastWeekOfMonth: getISOWeek(endOfMonth(newDate)),
            };
        });
    }

    /**
    * @returns generates 8 cells for the first row in the grid, first one is empty, the rest are the days of the week
    */
    const generateWeekDays = () => {
        if (isMobile) {
            return (
                [<div key="empty"></div>, ...daysinWeek.map((day, index) =>
                    <div key={index} className={`p-2 font-bold text-center`}>{day.substring(0, 1)}</div>)]
            )
        } else if (isTablet) {
            return (
                [<div key="empty"></div>, ...daysinWeek.map((day, index) =>
                    <div key={index} className={`p-2 font-bold text-center`}>{day.substring(0, 1)}</div>)]
            )
        } 
        
        else
            return (
                [<div key="empty"></div>, ...daysinWeek.map((day, index) =>
                    <div key={index} className={`p-2 font-bold text-center`}>{day}</div>)]
            )
    }


    /**
     * Calculates the correct values for startWeek and endWeek for the loop
     * @param monthInfo 
     * @param numbersOfWeeksInMonth 
     * @returns startWeek and endWeek values
     */
    function calculateStartAndEndWeeks(monthInfo: any, numbersOfWeeksInMonth: number) {
        let startWeek = monthInfo.firstWeekOfMonth;
        let endWeek = monthInfo.lastWeekOfMonth;

        if (monthInfo.lastWeekOfMonth === 1) {
            endWeek = monthInfo.firstWeekOfMonth + numbersOfWeeksInMonth;
        } else if (monthInfo.firstWeekOfMonth === 53 || monthInfo.firstWeekOfMonth === 52) {
            startWeek = 0;
        }

        return { startWeek, endWeek };
    }


    /**
    * Does the whole calculation and rendering of the calender grid.
    * @monthInfo is used for setting certain values in the the function. monthInfo is updated every month swap.
    * @returns Returns the whole calender grid. 2D JSX.Element array, with days, weeks and date-components inside
    */
    const generateCalenderGrid = () => {
        const rows = [];
        const startDateOfWeek = startOfWeek(monthInfo.firstDayOfMonth, { weekStartsOn: 1 });
        startDateOfWeek.setHours(startDateOfWeek.getHours() + 1);
        const lastDayOfMonth: Date = new Date(monthInfo.firstDayOfMonth.getFullYear(), monthInfo.firstDayOfMonth.getMonth() + 1, 0, 23, 59, 59, 999);
        const numbersOfWeeksInMonth = getWeeksInMonth(startDateOfWeek);
        let firstDayOfWeekToMap: Date = startDateOfWeek;

        rows.push(generateWeekDays());

        const { startWeek, endWeek } = calculateStartAndEndWeeks(monthInfo, numbersOfWeeksInMonth);

        for (let i = startWeek; i <= endWeek; i++) {
            if (i === 54) {
                break;
            }
            rows.push(generateDatesOfMonth(i, firstDayOfWeekToMap));
        }

        return rows;
    }


    /**
     * @returns the correct weeknumber value to display in the calender
     */
    function weekToMapDecider(weekToMap: number, dateToMap: Date) {
        if (weekToMap === 0 && getISOWeek(dateToMap) === 52) {
            return 52;
        } else if (weekToMap === 0 && getISOWeek(dateToMap) === 53) {
            return 53;
        } else if (weekToMap === 53 && getISOWeek(dateToMap) === 1) {
            return 1;
        } else {
            return weekToMap;
        }
    }


    /**
     * @param weekToMap 
     * @param dateToMap 
     * @returns Returns 1 row array, 8 columns long. first cell is weekNumber, the rest are mon-sun DayInMonth-components. JSX.Element[]
     */
    const generateDatesOfMonth = (weekToMap: number, dateToMap: Date) => {
        const cells = [];

        cells.push(<div key="weekNumber" className='font-bold text-center mt-2'>{weekToMapDecider(weekToMap, dateToMap)}</div>);

        for (let i = 0; i < 7; i++) {

            const nextDateToMap = new Date(dateToMap)
            cells.push(
                <div key={i}>
                    <DayInMonth
                        isDateSelected={selectedDate.getDate() == nextDateToMap.getDate() && selectedDate.getMonth() == nextDateToMap.getMonth() && selectedDate.getFullYear() == nextDateToMap.getFullYear()}
                        onClick={() => handleDateClick(nextDateToMap)}
                        dateToMap={nextDateToMap}
                        isDateInMonth={monthInfo.firstDayOfMonth.getMonth() == nextDateToMap.getMonth()} />
                </div>);
            dateToMap.setDate(dateToMap.getDate() + 1);
        }
        return cells;
    }

    if (isMobile) {
        return (
            <div>
                <div className='min-w-full'>
                    <div className='flex flex-row justify-center gap-12'>
                        <div onClick={() => handleChangeMonthClick(-1)}
                            className='p-2 '>{"<-"}</div>
                        <div className='p-2 flex-item text-center font-bold'>{monthsInYear[monthInfo.monthsInYearIndex] + ' ' + monthInfo.firstDayOfMonth.getFullYear()}</div>
                        <div onClick={() => handleChangeMonthClick(1)}
                            className='p-2'>{"->"}</div>


                    </div>
                    <div className={`grid grid-cols-8 `}>
                        {generateCalenderGrid()}
                    </div>

                </div>
                <div className={`mt-6`}>
                    {showDayView && <CalendarDayView dateToMap={selectedDate} />}
                </div>
            </div>


        )
    }

    if (!isMobile) {
        return (
            <div className='flex min-w-full'>
                <div className={`w-1/2 mr-10 justify-start`}>
                    <div className='flex justify-center gap-12'>
                        <div onClick={() => handleChangeMonthClick(-1)}
                            className='p-2'>{"<-"}</div>
                        <div className='p-2 flex-item text-center font-bold'>{monthsInYear[monthInfo.monthsInYearIndex] + ' ' + monthInfo.firstDayOfMonth.getFullYear()}</div>
                        <div onClick={() => handleChangeMonthClick(1)}
                            className='p-2'>{"->"}</div>

                    </div>
                    <div className={`grid grid-cols-8`}>
                        {generateCalenderGrid()}
                    </div>

                </div>
                <div className={`w-1/2 ml-10 p-2 justify-center`}>
                    <div className=''>
                    {showDayView && <CalendarDayView dateToMap={selectedDate} />}
                    </div>
                </div>
            </div>


        )
    }

}

export default CalendarMonthView;