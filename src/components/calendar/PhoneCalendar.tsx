import React, { useEffect, useContext} from 'react';
import CalendarWeekView from './blockcomponents/CalendarWeekView';
import CalendarMonthView from './blockcomponents/CalendarMonthView';


interface PhoneCalendarProps {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isPortrait: boolean;
}

const PhoneCalendar: React.FC<PhoneCalendarProps> = ({isMobile, isTablet, isDesktop, isPortrait}) => {

useEffect(() => {
    console.log("isPortrait changed: ", isPortrait)
}, [isPortrait]);


console.log("isPortrait: " + isPortrait);

if (!isPortrait){
    console.log("Phone + Landscape");
    return ( <CalendarWeekView />
  )
}

if (isPortrait){
    console.log("Phone + Portrait")
  return (
    <CalendarMonthView />
  )
}

}
export default PhoneCalendar;