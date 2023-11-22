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
    const currentDate = new Date('December 6, 2024, 02:00:00');
    //const currentDate: Date = new Date(); // Initialises the current date for the first load
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
     * @returns Returns the whole calender grid, with date components inside
     */
    const generateCalenderGrid = (firstWeekOfMonth: number, firstDayOfMonth: Date, lastWeekOfMonth: number) => {
        const startDateOfWeek = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
        const rows = [];
        startDateOfWeek.setHours(startDateOfWeek.getHours() + 1);
        
        //const lastDayOfMonth: Date = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth()+1);
        const lastDayOfMonth: Date = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0, 23, 59, 59, 999);

        //const endDateOfWeek: Date = startOfWeek(lastDayOfMonth, { weekStartsOn: 1 });
        const endWeek: number = getISOWeek(lastDayOfMonth);
        const numbersOfWeeksInMonth = getWeeksInMonth(startDateOfWeek);

        let firstDayToMap: Date = startDateOfWeek;
        console.log("Start Date", startDateOfWeek.toISOString())
        console.log("First week", firstWeekOfMonth)
        console.log("Last Date of month", lastDayOfMonth.toISOString())
        console.log("Last week", endWeek)
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
            
            for(let i = firstWeekOfMonth; i <= (firstWeekOfMonth + numbersOfWeeksInMonth); i++){  
                console.log("LOL")     
                console.log((firstWeekOfMonth + getWeeksInMonth(firstDayOfMonth)))
                console.log("I value: =", i)
                if(i==54){
                    break;
                }
                rows.push(generateDatesOfMonth(i, firstDayToMap,lastWeekOfMonth))
            }
        } else if (endWeek === 52){
            console.log("December last week = week 52")
            console.log("firstWeekOfMonth", firstWeekOfMonth);
            console.log("endWeek", endWeek);
            //console.log("endDateofWeek",endDateOfWeek);
            for(let i = firstWeekOfMonth; i < endWeek; i++){ 
                console.log("I value: =", i)
                if(i==52){
                    break;
                } 
                console.log("LOL")     
                rows.push(generateDatesOfMonth(i, firstDayToMap,lastWeekOfMonth))
            }}
        else{ 
            console.log("Alm måned")
            //return RegularMonths(daysinWeek/*,rows*/,firstWeekOfMonth,firstDayToMap,lastWeekOfMonth)
        for (let i = firstWeekOfMonth; i <= lastWeekOfMonth; i++) {
            
            rows.push(generateDatesOfMonth(i, firstDayToMap, lastWeekOfMonth))
        }} 
        
        return rows;
    }

    /**
     * 
     * @param firstWeekOfMonth is required for pushing the weeknumber in the array
     * @param firstDateToMap is required to map the first day in a week
     * @param lastWeekOfMonth is required for push the weeknumber when december ends with week 1
     * @returns Returns a cell array, 8 columns long. first cell is weekNumber, the rest are mon-sun DayInMonth-components.
     */
    const generateDatesOfMonth = (firstWeekOfMonth: number, firstDateToMap: Date, lastWeekOfMonth:number) => {
        const cells = [];
        
        
        if (firstWeekOfMonth === 52){
            cells.push(<div key="weekNumber" className='font-bold text-center'>{52}</div>);    
        } else if (firstWeekOfMonth === 53){
            cells.push(<div key="weekNumber" className='font-bold text-center'>{1}</div>); 
        }
        else{
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