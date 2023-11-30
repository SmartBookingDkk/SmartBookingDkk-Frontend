"use client"
import CalendarWeekView from '@/components/weekcalendar/CalendarWeekView'
import CalendarMonthView from '@/components/monthcalendar/CalendarMonthView'
import React, { useEffect, useState } from 'react'
import { ResponsiveContext } from '@/contexts/MediaQueryContext'
import { NextPage } from 'next';


const CalendarPage: NextPage = () => {
  const { isMobile, isTablet, isDesktop, isPortrait } = React.useContext(ResponsiveContext);
  const [loading, setLoading] = useState(true);
  console.log("MOBILE", isMobile);
  console.log("TABLET", isTablet);
  console.log("DESKTOP", isDesktop);

  console.log("PORTRÆT", isPortrait);

  useEffect(() => {
    if (isPortrait !== null) {
      setLoading(false);
    }
  }, [isPortrait]);


  if(loading){
    return <div>Loading...</div>
  }

  if (!isPortrait){
    
      return ( <CalendarWeekView />
    )
  }
  
  if (isPortrait){
    return (
      <CalendarMonthView />
    )
  }

  
};

export default CalendarPage;