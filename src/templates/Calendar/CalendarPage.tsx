"use client"
import CalendarWeekView from '@/components/calendar/blockcomponents/CalendarWeekView'
import CalendarMonthView from '@/components/calendar/blockcomponents/CalendarMonthView'
import React, { useEffect, useState, useContext } from 'react'
import { ResponsiveContext } from '@/contexts/MediaQueryContext'
import { NextPage } from 'next';
import PhoneCalendar from '@/components/calendar/PhoneCalendar'
import DesktopCalendar from '@/components/calendar/DesktopCalendar'
import {Spinner} from "@nextui-org/react";


const CalendarPage: NextPage = () => {
  const { isMobile, isTablet, isDesktop, isPortrait } = useContext(ResponsiveContext);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    if (isPortrait !== null) {
      setLoading(false);
    }
  }, [isPortrait]);


  if(loading){
    return <Spinner />
  }

  if (isMobile){
    return <PhoneCalendar isMobile={isMobile}
    isTablet={isTablet}
    isDesktop={isDesktop}
    isPortrait={isPortrait}/>
  } else {
    return <DesktopCalendar isMobile={isMobile}
    isTablet={isTablet}
    isDesktop={isDesktop}
    isPortrait={isPortrait}/>
  }

  

/*
  if (!isPortrait){
    
      return ( <CalendarWeekView />
    )
  }
  
  if (isPortrait){
    return (
      <CalendarMonthView />
    )
  }
*/
  
};

export default CalendarPage;