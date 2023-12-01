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


interface CalendarWeekViewProps {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isPortrait: boolean;
}

const CalendarWeekView: React.FC<CalendarWeekViewProps> = ({isMobile, isTablet, isDesktop, isPortrait}) => {
                  
        function getWeekDays(startOfCurrentWeek:Date){
          const weekDays:Date[] = [];
          for (let i = 1; i <= 7; i++) {
            weekDays.push(addDays(startOfCurrentWeek, i));
          }
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
      newDate.setDate(newDate.getDate() + weekSwap)
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


if (isMobile) {
return (
<div className='min-w-full'>
  <div className='flex flex-row justify-center gap-12'>
    <div onClick={() => handleChangeWeekClick(-1)}>{"<-"}  Forrige uge</div>
    <div className=''>{'Uge ' + weekInfo.weekNumber + ' - ' + weekInfo.firstDayOfWeek.getFullYear()}</div>
    <div onClick={() => handleChangeWeekClick(1)}>Næste uge {"->"}</div>
  </div>

  <table className="min-w-full border-collapse border-gray-300 mb-5">
    <thead>
      <tr>
        <th className="w-14">Time</th>
        {weekInfo.weekDays.map((day, index) => (
          <th key={index} className="p-2 min-w-full border-l-2">
            {daysInWeek[index] + ' '+ day.getDate() + '/' + (day.getMonth()+1)}
          </th>
        ))}
      </tr>
    </thead>
  </table>

  <table className="min-w-full">
    <tbody>
      {timeSlots.map(time => (
        <tr key={time}>
          <td className="relative h-6 w-14 text-right -top-3 right-2">
            {time.endsWith(':00') ? time : ''}</td>
          {weekInfo.weekDays.map(day => (
            <td key={`${day}-${time}`} className="h-6 min-w-full border-b-2 border-t-2">
              {}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>

);
}

if (!isMobile) {
  return (
    <div className='min-w-full'>
      <div className='flex flex-row justify-center gap-12'>
        <div onClick={() => handleChangeWeekClick(-1)}>{"<-"}  Forrige uge</div>
        <div className=''>{'Uge ' + weekInfo.weekNumber + ' - ' + weekInfo.firstDayOfWeek.getFullYear()}</div>
        <div onClick={() => handleChangeWeekClick(1)}>Næste uge {"->"}</div>
      </div>
    
      <table className="min-w-full border-collapse border-gray-300 mb-5 mt-5">
        <thead>
          <tr>
            <th className="w-14"></th>
            {weekInfo.weekDays.map((day, index) => (
              <th key={index} className="p-2 w-20">
                {daysInWeek[index] + ' '+ day.getDate() + '/' + (day.getMonth()+1)}
              </th>
            ))}
          </tr>
        </thead>
      </table>
    
      <table className="min-w-full">
        <tbody>
          {timeSlots.map(time => (
            <tr key={time}>
              <td className="relative h-6 w-14 text-right -top-3 right-2">
                {time.endsWith(':00') ? time : ''}</td>
              {weekInfo.weekDays.map((day,index) => (
                <td key={`${day}-${time}`} className={`h-6 w-20 border-b-2 border-t-2 ${index==0? '' : 'border-l-2'}` }>
                  
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    );  

    }
  }







export default CalendarWeekView;