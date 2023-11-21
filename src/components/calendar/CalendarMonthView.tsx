import React from 'react';
import getISOWeek from 'date-fns/getISOWeek';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns';
import DayInMonth from './dayInMonth/DayInMonth';
import startOfWeek from 'date-fns/startOfWeek';


const CalendarMonthView = () => {
    const daysinWeek: string[] = ['Mandag', 'Tirdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
    const currentDate = new Date();
    const firstDayOfMonth:Date = new Date(currentDate.getFullYear(), currentDate.getMonth(),1,1);
    const lastDayOfMonth:Date = new Date(currentDate.getFullYear(), currentDate.getMonth()+1);
    const firstWeekOfMonth:number = getISOWeek(firstDayOfMonth);
    const lastWeekOfMonth:number = getISOWeek(lastDayOfMonth);
    const numberOfWeeksInMonth:number = getISOWeek(lastDayOfMonth) - getISOWeek(firstDayOfMonth) + 1;

    
    
    
    
    
    


    const generateCalenderGrid = (firstWeekOfMonth:number,firstDayOfMonth:Date,lastWeekOfMonth:number) => {
        console.log("New run")

        const startDateOfWeek = startOfWeek(firstDayOfMonth, {weekStartsOn: 1});
        startDateOfWeek.setHours(startDateOfWeek.getHours() + 1);
        

        const rows = [];
        rows.push(generateWeekDays());
        let firstDayToMap:Date = startDateOfWeek
        console.log(firstDayToMap)
        for (let i = firstWeekOfMonth; i <= lastWeekOfMonth; i++) {
            rows.push(generateWeeksOfMonth(i,firstDayToMap))
            console.log("Først setDate= ", firstDayToMap);
            
            console.log("Efter setDate= ", firstDayToMap);

        }



        return rows;

    }

    const generateWeekDays = () => {
        return (
            [<div key="empty"></div>, ...daysinWeek.map((day, index) =>
             <div key={index} className='font-bold text-center'>{day}</div>)]
        )
    }

    const generateWeeksOfMonth = (firstWeekOfMonth:number,firstDateToMap:Date) => {
    
        const cells = [];
        cells.push(<div key="weekNumber" className='font-bold text-center'>{firstWeekOfMonth}</div>);
        for (let i = 0; i < 7; i++) {
            const dateToMap = new Date(firstDateToMap)
            cells.push(
            <div key={i}>
                <DayInMonth dateToMap={dateToMap} isDateInMonth={firstDayOfMonth.getMonth()==dateToMap.getMonth()}/>
            </div>);
            firstDateToMap.setDate(firstDateToMap.getDate()+1);
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