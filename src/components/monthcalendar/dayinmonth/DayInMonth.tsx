import React from "react";

interface DayProps {
  dateToMap: Date;
  isDateInMonth: boolean;
  onClick: () => void; 
}

//const DayInMonth = ({ dateToMap, isDateInMonth, onClick }: { dateToMap: Date; isDateInMonth: boolean }) => {
  const DayInMonth: React.FC<DayProps> = ({ dateToMap, isDateInMonth, onClick }) => {  // Add onClick here
  const containerClasses = `p-2 text-center border ${isDateInMonth ? 'border-black text-black hover:bg-sky-700' 
  : 'border-gray-300 text-gray-300 hover:bg-sky-300'}`;

  return (
    <div className={containerClasses} onClick={onClick}>
      {dateToMap.getDate()}
      
    </div>
  );
};
//  + "/" + (dateToMap.getMonth()+1) + "-" + dateToMap.getFullYear()
export default DayInMonth;