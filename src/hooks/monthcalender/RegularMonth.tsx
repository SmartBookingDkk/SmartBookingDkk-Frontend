import React from 'react';
import DayInMonth from '@components/monthcalendar/dayinmonth/DayInMonth';
import { ro } from 'date-fns/locale';
/***
 * This hooks calculates, generates and formats the dates for a regular month
 * @returns a rowArray with everything to be rendered in the calendar
 */
const RegularMonth = (daysinWeek: string[],/*rows: any[],*/ firstWeekOfMonth: number, firstDateToMap: Date, lastWeekOfMonth: number) => {
    const rows = [];
    console.log("RegularMonth");
    rows.push([<div key="empty"></div>, ...daysinWeek.map((day, index) =>
    <div key={index} className='p-2 font-bold text-center'>{day}</div>)])

    for (let i = firstWeekOfMonth; i <= lastWeekOfMonth; i++) {
        const cells = [];
        console.log("Generating dates");

        if (firstWeekOfMonth === 52) {
            cells.push(<div key="weekNumber" className='font-bold text-center'>{52}</div>);
        } else {
            cells.push(<div key="weekNumber" className='font-bold text-center'>{firstWeekOfMonth}</div>);
        }

        for (let t = 0; t < 7; t++) {
            console.log("FirstWeekOfMonth", firstWeekOfMonth);
            const dateToMap = new Date(firstDateToMap);
            cells.push(
                <div key={t}>
                    <DayInMonth dateToMap={dateToMap} isDateInMonth={firstDateToMap.getMonth() === dateToMap.getMonth()} />
                </div>
            );
            firstDateToMap.setDate(firstDateToMap.getDate() + 1);
        }
        rows.push(<div key={i} className='grid grid-cols-8 gap-1'>{cells}</div>);
        console.log("ROW PUSH")
    }

    console.log(rows);
    return rows;
    }


export default RegularMonth;