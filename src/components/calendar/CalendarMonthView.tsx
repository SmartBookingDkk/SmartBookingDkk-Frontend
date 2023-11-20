import React from 'react';

const CalendarMonthView = () => {
const currentDate = new Date();
const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);


  return (
    <div>
        <h1>CalendarMonthView</h1>
        <h1>{currentDate.toISOString()}</h1>
        <h1>{currentDate.getDay()}</h1>
        <h1>{firstDayOfMonth.toISOString()}</h1>
        </div>
  )
}

export default CalendarMonthView;