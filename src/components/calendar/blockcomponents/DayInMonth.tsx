import React from "react";

interface DayProps {
  isDateSelected: boolean;
  dateToMap: Date;
  isDateInMonth: boolean;
  onClick: () => void; 
}

  const DayInMonth: React.FC<DayProps> = ({ isDateSelected, dateToMap, isDateInMonth, onClick }) => {  
  const containerClasses = `p-2 text-center ${isDateInMonth ? 'text-black hover:bg-sky-700' 
  : 'border-black text-gray-300 hover:bg-sky-300'}`;
  

  const selectedContainerClass =`p-2 text-center bg-black text-white`;

  return (
    <div className={isDateSelected ? selectedContainerClass : containerClasses} onClick={onClick}>
      {dateToMap.getDate()}
      
    </div>
  );
};
export default DayInMonth;