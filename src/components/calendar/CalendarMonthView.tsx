import React from 'react';
import getISOWeek from 'date-fns/getISOWeek';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns';


const CalendarMonthView = () => {
    const daysinWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const currentDate = new Date();
    const firstDayOfMonth:Date = new Date(currentDate.getFullYear(), currentDate.getMonth(),1,1);
    const lastDayOfMonth:Date = new Date(currentDate.getFullYear(), currentDate.getMonth()+1);
    const firstWeekOfMonth:number = getISOWeek(firstDayOfMonth);
    const lastWeekOfMonth:number = getISOWeek(lastDayOfMonth);
    const numberOfWeeksInMonth:number = getISOWeek(lastDayOfMonth) - getISOWeek(firstDayOfMonth) + 1;

    
    //const numberOfWeeksInMonth:number =
    
    
    
    console.log(getISOWeek(firstDayOfMonth));
    console.log(firstDayOfMonth.toISOString());
    console.log(lastDayOfMonth.toISOString());
    console.log(getISOWeek(lastDayOfMonth));
    console.log(getISOWeek(firstDayOfMonth));
    console.log(numberOfWeeksInMonth);
    //console.log(endOfMonth(currentDate));


    const generateCalenderGrid = (firstWeekOfMonth:number,firstDayOfMonth:Date,lastWeekOfMonth:number) => {
        const rows = [];
        
        rows.push(generateWeekDays());
        let firstDayToMap:Date = firstDayOfMonth;

        for (let i = firstWeekOfMonth; i <= lastWeekOfMonth; i++) {
        rows.push(generateWeeksOfMonth(firstWeekOfMonth,firstDayToMap))
        firstDayToMap = new Date(firstDayToMap.getFullYear(), firstDayToMap.getMonth(), firstDayToMap.getDate()+7);
        firstWeekOfMonth++;
        }



        return rows;

    }

    const generateWeekDays = () => {
        return (
            [<div key="empty"></div>, ...daysinWeek.map((day, index) =>
             <div key={index} className='font-bold text-center'>{day}</div>)]
        )
    }

    const generateWeeksOfMonth = (firstWeekOfMonth:number,firstDayToMap:Date) => {
        const cells = [];
        cells.push(<div key="weekNumber" className='font-bold text-center'>{firstWeekOfMonth}</div>);
        for (let i = 0; i < 7; i++) {
            cells.push(<div key={i} className='font-bold text-center'>{firstDayToMap.getDate()}</div>);
            firstDayToMap.setDate(firstDayToMap.getDate()+1);
        }
        return cells;
    }

  return (
    <div className={`grid grid-cols-8 `}>
        {generateCalenderGrid(firstWeekOfMonth,firstDayOfMonth,lastWeekOfMonth)}
    </div>
  )
}


export default CalendarMonthView;