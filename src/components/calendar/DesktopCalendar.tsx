import React, {useState} from 'react';
import CalendarWeekView from './blockcomponents/CalendarWeekView';
import CalendarMonthView from './blockcomponents/CalendarMonthView';



interface DesktopCalendarProps {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isPortrait: boolean;
}

const DesktopCalendar: React.FC<DesktopCalendarProps> = ({isMobile, isTablet, isDesktop, isPortrait}) => {
const [isMonthView, setMonthView] = useState(true);

return (
    
    <div className='h-screen'>
    <div>
        <div className='h-10 flex flex-row justify-center gap-12 mb-5 border-b-2 border-double border-black'>
    <div onClick={() =>setMonthView(true)} className={`p2 text-center ${isMonthView ? 'font-bold': ''}`}>Månedskalender</div>
    <div onClick={() =>setMonthView(false)} className={`p2 text-center ${isMonthView ? '': 'font-bold'}`}>Ugekalender</div>
    </div>
    
     {isMonthView ? <CalendarMonthView isMobile={isMobile}
    isTablet={isTablet}
    isDesktop={isDesktop}
    isPortrait={isPortrait}/>
    :
     <CalendarWeekView isMobile={isMobile}
     isTablet={isTablet}
     isDesktop={isDesktop}
     isPortrait={isPortrait}
     
     />}
    
    </div>
    </div>
    
)
}

export default DesktopCalendar;