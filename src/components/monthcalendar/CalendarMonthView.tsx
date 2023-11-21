"use client";
import React, {useState} from 'react';
import getISOWeek from 'date-fns/getISOWeek';   
import DayInMonth from './dayinmonth/DayInMonth';
import startOfWeek from 'date-fns/startOfWeek';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import getWeeksInMonth from 'date-fns/getWeeksInMonth';


const CalendarMonthView = () => {
    const daysinWeek: string[] = ['Mandag', 'Tirdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
    const monthsInYear: string[] = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];    
    //const currentDate = new Date('December 6, 2023, 02:00:00');
    const currentDate:Date = new Date(); // Initialises the current date for the first load
    const [monthsInYearIndex, setMonthsInYearIndex] = useState(currentDate.getMonth()); // Sets the current month for the StringArray Print.
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(startOfMonth(currentDate)); // Sets the first date of the month
    const [firstWeekOfMonth, setFirstWeekOfMonth] = useState(getISOWeek(firstDayOfMonth)); // Sets first weeknumber of the first week in the month
    const [lastWeekOfMonth, setLastWeekOfMonth] = useState(getISOWeek(endOfMonth(firstDayOfMonth))); // Sets last weeknumber of the last week in the month
    

    /**
     * @param monthSwapValue Handles the swap of dates when the previous or next month is pressed
     */
    function handleChangeMonthClick(monthSwapValue:number){
        const newDate = new Date(firstDayOfMonth);
        
        newDate.setMonth(newDate.getMonth() + monthSwapValue); // Swap the month to the next or previous month
        
        setFirstDayOfMonth(newDate); // Sets the first day of the "new" month
        setMonthsInYearIndex(newDate.getMonth()); // Sets the month index for the StringArray Print
        setFirstWeekOfMonth(getISOWeek(newDate)); // Sets the first weeknumber of the "new" month
        setLastWeekOfMonth((getISOWeek(endOfMonth(newDate)))); //Sets the last weeknumber of the "new" month
        
    }
    
    /**
     * Does the whole generation of the calender grid
     * @param firstWeekOfMonth 
     * @param firstDayOfMonth 
     * @param lastWeekOfMonth 
     * @returns Returns the whole calender grid, with date components inside
     */
    const generateCalenderGrid = (firstWeekOfMonth: number, firstDayOfMonth: Date, lastWeekOfMonth: number) => {
        const startDateOfWeek = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
        const rows = [];
        startDateOfWeek.setHours(startDateOfWeek.getHours() + 1);
        
        const lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth()+1);
        const endDateOfWeek = startOfWeek(lastDayOfMonth, { weekStartsOn: 1 });
        const endWeek:number = getISOWeek(endDateOfWeek);
        
        let firstDayToMap: Date = startDateOfWeek;
        console.log("Start Date", startDateOfWeek.toISOString())
        console.log("First week", firstWeekOfMonth)
        console.log("End Date", lastDayOfMonth.toISOString())
        console.log("Last week", lastWeekOfMonth)
        console.log("--------------------")
        

        rows.push(generateWeekDays());
        
        if (firstWeekOfMonth === 52){
            console.log("Januar")
            for(let i = 0; i < lastWeekOfMonth; i++){
                rows.push(generateDatesOfMonth(i, firstDayToMap,lastWeekOfMonth))
            }
        } else if (endWeek === 1){
            console.log("December last week = week 1")
            console.log("firstWeekOfMonth", firstWeekOfMonth);
            console.log("endWeek", endWeek);
            console.log("endDateofWeek",endDateOfWeek);
            for(let i = firstWeekOfMonth; i <= (lastWeekOfMonth); i++){  
                console.log("LOL")     
                console.log((firstWeekOfMonth + getWeeksInMonth(firstDayOfMonth)))
                rows.push(generateDatesOfMonth(i, firstDayToMap,lastWeekOfMonth))
            }
        } else if (endWeek === 52){
            console.log("December last week = week 52")
            console.log("firstWeekOfMonth", firstWeekOfMonth);
            console.log("endWeek", endWeek);
            console.log("endDateofWeek",endDateOfWeek);
            for(let i = firstWeekOfMonth; i <= endWeek; i++){  
                console.log("LOL")     
                rows.push(generateDatesOfMonth(i, firstDayToMap,lastWeekOfMonth))
            }}
        else{ 
            console.log("Alm måned")
        for (let i = firstWeekOfMonth; i <= lastWeekOfMonth; i++) {
            
            rows.push(generateDatesOfMonth(i, firstDayToMap, lastWeekOfMonth))
        }} 
        
        
            
        return rows;
    }

    /**
     * 
     * @param firstWeekOfMonth 
     * @param firstDateToMap 
     * @param lastWeekOfMonth 
     * @returns Returns
     */
    const generateDatesOfMonth = (firstWeekOfMonth: number, firstDateToMap: Date, lastWeekOfMonth:number) => {
        const cells = [];
        console.log("Generating dates");
        /*
        if (firstWeekOfMonth != 1 && lastWeekOfMonth != 52){
            for (let i = firstWeekOfMonth; i <= lastWeekOfMonth; i++) {
                const dateToMap = new Date(firstDateToMap)
                console.log("HIIIIT")
                cells.push(<div key={i}>
                    <DayInMonth dateToMap={dateToMap} isDateInMonth={firstDayOfMonth.getMonth() == dateToMap.getMonth()} />
                </div>);
                
            }
            firstDateToMap.setDate(firstDateToMap.getDate() + 1);
        } */
        
        if (firstWeekOfMonth === 52){
            cells.push(<div key="weekNumber" className='font-bold text-center'>{52}</div>);    
        } else{
        cells.push(<div key="weekNumber" className='font-bold text-center'>{firstWeekOfMonth}</div>);
        }

        for (let i = 0; i < 7; i++) {
            console.log("FirstWeekOfMonth", firstWeekOfMonth)
            const dateToMap = new Date(firstDateToMap)
            cells.push(
                <div key={i}>
                    <DayInMonth dateToMap={dateToMap} isDateInMonth={firstDayOfMonth.getMonth() == dateToMap.getMonth()} />
                </div>);
            firstDateToMap.setDate(firstDateToMap.getDate() + 1);
        }
        return cells;
    }

    /**
     * @returns generates 8 cells for the first row in the grid, first one is empty, the rest are the days of the week
     */
    const generateWeekDays = () => {
        console.log("Generate week days")
        console.log("-----------");
        return (
            [<div key="empty"></div>, ...daysinWeek.map((day, index) =>
                <div key={index} className='p-2 font-bold text-center'>{day}</div>)]
        )
    }

    return (
        <div>
            <div onClick={() => handleChangeMonthClick(-1)}
                className='p-2 absolute '>{"<-"}</div>
                <br></br>
                <div onClick={() => handleChangeMonthClick(1)}
                className='p-2 absolute'>{"->"}</div>
                <br></br>
                <div className='p-2 flex-item text-center font-bold'>{monthsInYear[monthsInYearIndex] + ' ' + firstDayOfMonth.getFullYear()}</div>
            
            <div className={`grid grid-cols-8 `}>
                {generateCalenderGrid(firstWeekOfMonth, firstDayOfMonth, lastWeekOfMonth)}
            </div>

        </div>
    )
}


export default CalendarMonthView;