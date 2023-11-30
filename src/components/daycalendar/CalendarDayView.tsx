"use client"
import React, { useState } from 'react';
import getISOWeek from 'date-fns/getISOWeek';
import startOfWeek from 'date-fns/startOfWeek';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import addDays from 'date-fns/addDays';
import { endOfWeek } from 'date-fns';
import { addWeeks } from 'date-fns';
import getDay from 'date-fns/getDay';

const daysInWeek: string[] = ['Mandag', 'Tirdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
const monthsInYear: string[] = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
const currentDate = new Date();
currentDate.setHours(1, 0, 0, 0);

const openHour: number = 10;
const closingHour: number = 18;
const timeSlotSize: number = 15;

interface CalendarDayViewProps {
  dateToMap: Date;
}


  const CalendarDayView: React.FC<CalendarDayViewProps> = ({dateToMap}) => {
  console.log("Current date:= ", currentDate)



  const [dayInfo, setDayInfo] = useState({
    monthsInYearIndex: currentDate.getMonth(),
    currentDay: currentDate,
    weekNumber: getISOWeek(currentDate),
    dayNumberInWeek: getDay(currentDate)
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
  function handleChangeDayClick(daySwap: number) {
    setDayInfo(prevDayInfo => {
      const newDate = addDays(prevDayInfo.currentDay, daySwap);
      return {
        monthsInYearIndex: newDate.getMonth(),
        currentDay: newDate,
        weekNumber: getISOWeek(newDate),
        dayNumberInWeek: getDay(newDate)

      };
    });
  }

/* 
<div className='flex flex-row justify-center gap-8'>
        <div onClick={() => handleChangeDayClick(-1)}>{"<-"}  Forrige dag</div>
        <div className=''>{'Uge ' + dayInfo.weekNumber + ' // ' + monthsInYear[dayInfo.monthsInYearIndex]
          + '  ' + dayInfo.currentDay.getFullYear()}</div>
        <div onClick={() => handleChangeDayClick(1)}>Næste dag {"->"}</div>
      </div>
*/
  return (
    <div>
      

      <table className="min-w-full border-collapse border-gray-300 mb-5">
        <thead className=''>
          <tr>
            <th className="w-6"></th>

            <th className="p-2 min-w-full">
              {daysInWeek[dateToMap.getDay()] + ' ' + dateToMap.getDate() + '/' + (dateToMap.getMonth() + 1)}
            </th>
          </tr>
        </thead>
      </table>
      <table className='min-w-full'>
        <tbody>
          {timeSlots.map(time => (
            <tr key={time}>
              <td className="relative h-6 w-6 text-right -top-3 right-2">{time.endsWith(':00') ? time : ''}</td>
              <td className="h-6 min-w-full border-b-2 border-t-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


}

export default CalendarDayView;