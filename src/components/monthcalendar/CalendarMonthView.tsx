"use client";
import React, { useState } from 'react';
import getISOWeek from 'date-fns/getISOWeek';
import DayInMonth from './dayinmonth/DayInMonth';
import startOfWeek from 'date-fns/startOfWeek';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import getWeeksInMonth from 'date-fns/getWeeksInMonth';

const daysinWeek: string[] = ['Mandag', 'Tirdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
const monthsInYear: string[] = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
const currentDate = new Date('December 2, 2029, 02:00:00');
const CalendarMonthView = () => {
    
    // An object used to set certain values for calculating the calender grid. Updates when the month is changed and renders the page
    const [dateInfo, setDateInfo] = useState({
        monthsInYearIndex: currentDate.getMonth(),
        firstDayOfMonth: startOfMonth(currentDate),
        firstWeekOfMonth: getISOWeek(startOfMonth(currentDate)),
        lastWeekOfMonth: getISOWeek(endOfMonth(startOfMonth(currentDate))),
      });

    /** 
    * Function that handles the click on the arrows to change the month
    * @param monthSwapValue is the value that is added to the current month index, to swap the month
    */
    function handleChangeMonthClick(monthSwapValue: number) {
        setDateInfo(prevDateInfo => {
            const newDate = new Date(prevDateInfo.firstDayOfMonth.getTime());
            newDate.setMonth(newDate.getMonth() + monthSwapValue);
    
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
        return (
            [<div key="empty"></div>, ...daysinWeek.map((day, index) =>
                <div key={index} className='p-2 font-bold text-center'>{day}</div>)]
        )
    }

    /**
    * Does the whole generation of the calender grid
    * @param firstWeekOfMonth 
    * @param firstDayOfMonth 
    * @param lastWeekOfMonth 
    * @returns Returns the whole calender grid. 2D JSX.Element array, with days, weeks and date-components inside
    */
    const generateCalenderGrid = () => {
        const rows = [];
        const startDateOfWeek = startOfWeek(dateInfo.firstDayOfMonth, { weekStartsOn: 1 });
        startDateOfWeek.setHours(startDateOfWeek.getHours() + 1);       
        const lastDayOfMonth: Date = new Date(dateInfo.firstDayOfMonth.getFullYear(), dateInfo.firstDayOfMonth.getMonth() + 1, 0, 23, 59, 59, 999);
    
        let endWeek: number = getISOWeek(lastDayOfMonth);
        const numbersOfWeeksInMonth = getWeeksInMonth(startDateOfWeek);
        let firstDayOfWeekToMap: Date = startDateOfWeek;

        rows.push(generateWeekDays());

        /*

        // January where first week is 52;
        if (dateInfo.firstWeekOfMonth === 52) {
            for (let i = 0; i <= dateInfo.lastWeekOfMonth; i++) {
                rows.push(generateDatesOfMonth(i, firstDayOfWeekToMap))
            }
        } 
        // January where first week is 53;
        else if (dateInfo.firstWeekOfMonth === 53) {
            for (let i = 0; i <= dateInfo.lastWeekOfMonth; i++) {
                rows.push(generateDatesOfMonth(i, firstDayOfWeekToMap))
            }
        }
        // December where last week is 1;
        else if (dateInfo.lastWeekOfMonth === 1) {
            for (let i = dateInfo.firstWeekOfMonth; i <= (dateInfo.firstWeekOfMonth + numbersOfWeeksInMonth); i++) {
                /*
                This was needed earlier. Not confident deleting it yet.
                if (i == 54) {
                    break;
                }
                rows.push(generateDatesOfMonth(i, firstDayOfWeekToMap))
            }
        }
        // December where last week is 53;
        else if (dateInfo.lastWeekOfMonth === 53) {
            for (let i = dateInfo.firstWeekOfMonth; i <= endWeek; i++) {
                rows.push(generateDatesOfMonth(i, firstDayOfWeekToMap))
            }
        }

        // Regular month
        else {
            for (let i = dateInfo.firstWeekOfMonth; i <= dateInfo.lastWeekOfMonth; i++) {
                rows.push(generateDatesOfMonth(i, firstDayOfWeekToMap))
            }
        }
        */
    let startWeek = dateInfo.firstWeekOfMonth;
    

    if (dateInfo.lastWeekOfMonth === 1) {
       endWeek = dateInfo.firstWeekOfMonth + numbersOfWeeksInMonth;
    } else if (dateInfo.lastWeekOfMonth === 53) {
        endWeek = endWeek;
    }

    for (let i = startWeek; i <= endWeek; i++) {
        rows.push(generateDatesOfMonth(i, firstDayOfWeekToMap));
    }


        return rows;
    }

    /**
    * @param firstWeekOfMonth is required for pushing the weeknumber in the array
    * @param firstDateToMap is required to map the first day in a week
    * @param lastWeekOfMonth is required for push the weeknumber when december ends with week 1
    * @returns Returns 1 row array, 8 columns long. first cell is weekNumber, the rest are mon-sun DayInMonth-components.
    */
    const generateDatesOfMonth = (weekToMap: number, dateToMap: Date) => {
        const cells = [];
        if (weekToMap === 0 && getISOWeek(dateToMap) === 52) {
            cells.push(<div key="weekNumber" className='font-bold text-center'>{52}</div>);
        } else if (weekToMap === 0 && getISOWeek(dateToMap) === 53) {
            cells.push(<div key="weekNumber" className='font-bold text-center'>{53}</div>);
        } else if (weekToMap === 53 && getISOWeek(dateToMap) === 1) {
            cells.push(<div key="weekNumber" className='font-bold text-center'>{1}</div>);
        } else {
            cells.push(<div key="weekNumber" className='font-bold text-center'>{weekToMap}</div>);
        }

        for (let i = 0; i < 7; i++) {

            const nextDateToMap = new Date(dateToMap)
            cells.push(
                <div key={i}>
                    <DayInMonth dateToMap={nextDateToMap} isDateInMonth={dateInfo.firstDayOfMonth.getMonth() == nextDateToMap.getMonth()} />
                </div>);
            dateToMap.setDate(dateToMap.getDate() + 1);
        }
        return cells;
    }

    /**
    * @returns Returns the whole calender grid, with date components inside
    */
    return (
        <div>
            <div onClick={() => handleChangeMonthClick(-1)}
                className='p-2 absolute '>{"<-"}</div>
            <br></br>
            <div onClick={() => handleChangeMonthClick(1)}
                className='p-2 absolute'>{"->"}</div>
            <br></br>
            <div className='p-2 flex-item text-center font-bold'>{monthsInYear[dateInfo.monthsInYearIndex] + ' ' + dateInfo.firstDayOfMonth.getFullYear()}</div>

            <div className={`grid grid-cols-8 `}>
                {generateCalenderGrid()}
            </div>

        </div>
    )
}

export default CalendarMonthView;