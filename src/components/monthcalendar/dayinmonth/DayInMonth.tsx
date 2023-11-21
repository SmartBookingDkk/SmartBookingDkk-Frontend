import React from "react";

const DayInMonth = ({ dateToMap, isDateInMonth }: { dateToMap: Date; isDateInMonth: boolean }) => {
  
  const containerClasses = `p-2 text-center border ${isDateInMonth ? 'border-black text-black hover:bg-sky-700' 
  : 'border-gray-300 text-gray-300 hover:bg-sky-300'}`;

  return (
    <div className={containerClasses}>
      {dateToMap.getDate() + "/" + (dateToMap.getMonth()+1) + "-" + dateToMap.getFullYear()}
      
    </div>
  );
};

export default DayInMonth;