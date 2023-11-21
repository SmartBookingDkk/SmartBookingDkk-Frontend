import React from "react";

const DayInMonth = ({ dateToMap, isDateInMonth }: { dateToMap: Date; isDateInMonth: boolean }) => {
  
  const containerClasses = `text-center border ${isDateInMonth ? 'border-black text-black' : 'border-gray-400 text-gray-400'}`;

  return (
    <div className={containerClasses}>
      {dateToMap.getDate()}
      
    </div>
  );
};

export default DayInMonth;