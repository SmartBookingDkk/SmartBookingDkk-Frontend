import React from "react";

interface DayProps {
  dateToMap: Date;
  isDateInMonth: boolean;
  onClick: () => void; 
}

  const DayInMonth: React.FC<DayProps> = ({ dateToMap, isDateInMonth, onClick }) => {  
  const containerClasses = `p-2 text-center ${isDateInMonth ? 'text-black hover:bg-sky-700' 
  : 'border-black text-gray-300 hover:bg-sky-300'}`;

  return (
    <div className={containerClasses} onClick={onClick}>
      {dateToMap.getDate()}
      
    </div>
  );
};
export default DayInMonth;