"use client"
import React, { useState } from 'react';
import getISOWeek from 'date-fns/getISOWeek';
import startOfWeek from 'date-fns/startOfWeek';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import addDays from 'date-fns/addDays';
import { endOfWeek } from 'date-fns';
import { addWeeks } from 'date-fns';

const daysInWeek: string[] = ['Mandag', 'Tirdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
const monthsInYear: string[] = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
const currentDate = new Date();
currentDate.setHours(1, 0, 0, 0);

const openHour: number = 10;
const closingHour: number = 18;
const timeSlotSize: number = 15;

const CalendarWeekView = () => {
        
        console.log("Current date:= ", currentDate)
          
        function getWeekDays(startOfCurrentWeek:Date){
          const weekDays:Date[] = [];
          for (let i = 1; i <= 7; i++) {
            weekDays.push(addDays(startOfCurrentWeek, i));
          }
          console.log(weekDays);
          return weekDays;
        }


        const [weekInfo, setWeekInfo] = useState({
                monthsInYearIndex: currentDate.getMonth(),
                firstDayOfWeek: startOfWeek(currentDate),
                lastDayOfWeek: endOfWeek(currentDate),
                weekNumber: getISOWeek(currentDate),
                lastWeekOfMonth: getISOWeek(endOfMonth(startOfMonth(currentDate))),
                weekDays: getWeekDays(startOfWeek(currentDate))
        });


        /**
         * Calculates timeslots for the day
         */
        const timeSlots: string[] = [];
        for (let hour = openHour; hour <= closingHour; hour++) {
            for (let minute = 0; minute < 60; minute += timeSlotSize) {
                const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                timeSlots.push(timeSlot);
            }
        }
        
        
  /** 
    * Function that handles the click on the arrows to change the month
    * @param monthSwapValue is the value that is added to the current month index, to swap the month
    */
function handleChangeWeekClick(weekSwap: number) {
  setWeekInfo(prevWeekInfo => {
    const newDate = addWeeks(prevWeekInfo.firstDayOfWeek, weekSwap);
      console.log("newDate before swap: ", newDate)
      newDate.setDate(newDate.getDate() + weekSwap)
      console.log("newDate after swap: ", newDate)
      console.log("before swap weekNumber=",prevWeekInfo.weekNumber)
      console.log("after swap weekNumber=",getISOWeek(newDate))
      console.log(getISOWeek(newDate));
      return {
          monthsInYearIndex: newDate.getMonth(),
          firstDayOfWeek: startOfWeek(newDate),
          lastDayOfWeek: endOfWeek(newDate),
          weekNumber: getISOWeek(newDate),
          lastWeekOfMonth: getISOWeek(endOfMonth(startOfMonth(newDate))),
          weekDays: getWeekDays(startOfWeek(newDate))
      };
  });
}


return (
  <div className='min-w-full'>
    <div className='flex flex-row justify-center gap-8'>
      <div onClick={() => handleChangeWeekClick(-1)}>{"<-"}  Forrige uge</div>
      <div className=''>{'Uge ' + weekInfo.weekNumber + ' // ' + monthsInYear[weekInfo.monthsInYearIndex]
      + '  ' +weekInfo.firstDayOfWeek.getFullYear()}</div>
      <div onClick={() => handleChangeWeekClick(1)}>Næste uge {"->"}</div>
    </div>

    <table className="min-w-full border border-collapse border-gray-300">
      <thead className=''>
        <tr>
          <th className="p-2 border">Time</th>
          {weekInfo.weekDays.map((day, index) => (
            <th key={index} className="p-2 border">
              {daysInWeek[index] + ' '+ day.getDate() + '/' + (day.getMonth()+1)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map(time => (
          <tr key={time}>
            <td className="border-collapse border-black h-4 text-right">{time.endsWith(':00') ? time : ''}</td>
            {weekInfo.weekDays.map(day => (
              <td key={`${day}-${time}`} className="border h-6">
                {/* Booking stuff goez heere! */}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
  
           
    }
            



export default CalendarWeekView;
