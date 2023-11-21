"use client";
import React, {useState} from 'react';
import getISOWeek from 'date-fns/getISOWeek';   
import DayInMonth from './dayinmonth/DayInMonth';
import startOfWeek from 'date-fns/startOfWeek';


const CalendarMonthView = () => {
    const daysinWeek: string[] = ['Mandag', 'Tirdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
    const monthsInYear: string[] = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
    //const currentDate = new Date('Decemer 2, 2023, 02:00:00');
    const currentDate = new Date();
    //const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    //const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [monthsInYearIndex, setMonthsInYearIndex] = useState(currentDate.getMonth());
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 1));
    const [lastDayOfMonth, setLastDayOfMonth] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth() +1, 0));
    const [firstWeekOfMonth, setFirstWeekOfMonth] = useState(getISOWeek(firstDayOfMonth));
    const [lastWeekOfMonth, setLastWeekOfMonth] = useState(getISOWeek(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)));
    
    

    const generateCalenderGrid = (firstWeekOfMonth: number, firstDayOfMonth: Date, lastWeekOfMonth: number) => {
        const startDateOfWeek = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
        
        startDateOfWeek.setHours(startDateOfWeek.getHours() + 1);
        
        const lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0);
        const endDateOfWeek = startOfWeek(lastDayOfMonth, { weekStartsOn: 1 });
        const endWeek:number = getISOWeek(endDateOfWeek);
        
        const rows = [];
        let firstDayToMap: Date = startDateOfWeek;
        
        
        rows.push(generateWeekDays());
        
        
        
        if (firstWeekOfMonth === 52){
            for(let i = 0; i < lastWeekOfMonth; i++){
                rows.push(generateWeeksOfMonth(i, firstDayToMap))
            }
        } else if (endWeek === 52){
            for(let i = firstWeekOfMonth; i <= endWeek; i++){
                
                rows.push(generateWeeksOfMonth(i, firstDayToMap))
            }
        }
        else{ 
        for (let i = firstWeekOfMonth; i <= lastWeekOfMonth; i++) {
            
            rows.push(generateWeeksOfMonth(i, firstDayToMap))
        }}
        
        
        return rows;
    }

    const generateWeekDays = () => {
        return (
            [<div key="empty"></div>, ...daysinWeek.map((day, index) =>
                <div key={index} className='p-2 font-bold text-center'>{day}</div>)]
        )
    }

    const generateWeeksOfMonth = (firstWeekOfMonth: number, firstDateToMap: Date) => {
        const cells = [];
        
        if (firstWeekOfMonth === 0){
            cells.push(<div key="weekNumber" className='font-bold text-center'>{52}</div>);    
        } else{

        cells.push(<div key="weekNumber" className='font-bold text-center'>{firstWeekOfMonth}</div>);
        }

        for (let i = 0; i < 7; i++) {
            const dateToMap = new Date(firstDateToMap)
            cells.push(
                <div key={i}>
                    <DayInMonth dateToMap={dateToMap} isDateInMonth={firstDayOfMonth.getMonth() == dateToMap.getMonth()} />
                </div>);
            firstDateToMap.setDate(firstDateToMap.getDate() + 1);
        }
        return cells;
    }

    function handleChangeMonthClick(monthSwapValue:number){
            const newDate = new Date(firstDayOfMonth);
            
            newDate.setMonth(newDate.getMonth() + monthSwapValue);
            
            setFirstDayOfMonth(newDate);
            setMonthsInYearIndex(newDate.getMonth());
            setFirstWeekOfMonth(getISOWeek(newDate));
            setLastWeekOfMonth(getISOWeek(new Date(newDate.getFullYear(), newDate.getMonth() + 1)));
            setLastDayOfMonth(new Date(newDate.getFullYear(), newDate.getMonth() +1, 0))
            
    }

    return (
        <div>
            <div className='flex flex-row justify-center'>
                <div onClick={() => handleChangeMonthClick(-1)}
                className='p-2'>{"<-"}</div>
                <div className='p-2 flex-item text-center font-bold'>{monthsInYear[monthsInYearIndex]}</div>
                <div onClick={() => handleChangeMonthClick(1)}
                className='p-2'>{"->"}</div>
            </div>
            
            <div className={`grid grid-cols-8 `}>
                {generateCalenderGrid(firstWeekOfMonth, firstDayOfMonth, lastWeekOfMonth)}
            </div>

        </div>
    )
}


export default CalendarMonthView;