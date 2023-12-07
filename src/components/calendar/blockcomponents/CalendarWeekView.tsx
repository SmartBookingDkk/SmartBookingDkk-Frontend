"use client"
import React, { useState } from 'react';
import getISOWeek from 'date-fns/getISOWeek';
import startOfWeek from 'date-fns/startOfWeek';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import addDays from 'date-fns/addDays';
import { endOfWeek } from 'date-fns';
import { addWeeks } from 'date-fns';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Link, Input } from "@nextui-org/react"
import useFetchBookings from '@/hooks/fetchBookings';




const daysInWeek: string[] = ['Mandag', 'Tirdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
const monthsInYear: string[] = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
const currentDate = new Date();
currentDate.setHours(1, 0, 0, 0);

const openHour: number = 10;
const closingHour: number = 18;
const timeSlotSize: number = 15;

const employeeId: number = 1;


interface CalendarWeekViewProps {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPortrait: boolean;
}


const CalendarWeekView: React.FC<CalendarWeekViewProps> = ({ isMobile, isTablet, isDesktop, isPortrait }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedCell, setSelectedCell] = useState<{ time: string; day: Date } | null>(null);
  
  

  const [weekInfo, setWeekInfo] = useState({
    monthsInYearIndex: currentDate.getMonth(),
    firstDayOfWeek: startOfWeek(currentDate),
    lastDayOfWeek: endOfWeek(currentDate),
    weekNumber: getISOWeek(currentDate),
    lastWeekOfMonth: getISOWeek(endOfMonth(startOfMonth(currentDate))),
    weekDays: getWeekDays(startOfWeek(currentDate))
  });

  const { data, isLoading } = useFetchBookings(employeeId, weekInfo.firstDayOfWeek, weekInfo.lastDayOfWeek);
  console.log(data)

/**
 * Maps the days (name) of the week
 * @param startOfCurrentWeek 
 * @returns 
 */
  function getWeekDays(startOfCurrentWeek: Date) {
    const weekDays: Date[] = [];
    for (let i = 1; i <= 7; i++) {
      weekDays.push(addDays(startOfCurrentWeek, i));
    }
    return weekDays;
  }





  /**
   * Calculates timeslots for the day
   */
  const timeSlots: string[] = [];
  for (let hour = openHour; hour <= closingHour; hour++) {
    for (let minute = 0; minute < 60; minute += timeSlotSize) {
      const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(timeSlot);
    }

  }


  /** 
    * Function that handles the click on the arrows to change the month
    * @param monthSwapValue is the value that is added to the current month index, to swap the month
    */
  function handleChangeWeekClick(weekSwap: number) {
    setWeekInfo(prevWeekInfo => {
      const newDate = addWeeks(prevWeekInfo.firstDayOfWeek, weekSwap);
      newDate.setDate(newDate.getDate() + weekSwap)
      return {
        monthsInYearIndex: newDate.getMonth(),
        firstDayOfWeek: startOfWeek(newDate),
        lastDayOfWeek: endOfWeek(newDate),
        weekNumber: getISOWeek(newDate),
        lastWeekOfMonth: getISOWeek(endOfMonth(startOfMonth(newDate))),
        weekDays: getWeekDays(startOfWeek(newDate))
      };
    });
  }

  const handleCellClick = (timeSlot: string, day: Date) => {
    console.log("day: ", day);
    console.log("timeSlot: ", timeSlot);
    setSelectedCell({ time: timeSlot, day });
    onOpen();
  };




  if (isMobile) {
    return (
      <div className='min-w-full'>
        <div className='flex flex-row justify-center gap-12'>
          <div onClick={() => handleChangeWeekClick(-1)}>{"<-"}  Forrige uge</div>
          <div className=''>{'Uge ' + weekInfo.weekNumber + ' - ' + weekInfo.firstDayOfWeek.getFullYear()}</div>
          <div onClick={() => handleChangeWeekClick(1)}>Næste uge {"->"}</div>
        </div>

        <table className="min-w-full border-collapse border-gray-300 mb-5">
          <thead>
            <tr>
              <th className="w-14"></th>
              {weekInfo.weekDays.map((day, index) => (
                <th key={index} className="p-2 min-w-full">
                  {daysInWeek[index] + ' ' + day.getDate() + '/' + (day.getMonth() + 1)}
                </th>
              ))}
            </tr>
          </thead>
        </table>

        <table className="min-w-full">
          <tbody>
            {timeSlots.map(time => (
              <tr key={time}>
                <td className="relative h-6 w-14 text-right -top-3 right-2">
                  {time.endsWith(':00') ? time : ''}</td>
                {weekInfo.weekDays.map((day, index) => (
                  <td key={`${day}-${time}`}
                    className={`h-6 min-w-full border-b-2 border-t-2`}
                    onClick={() => handleCellClick(time, day)}>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    );
  }

  

  if (isLoading) return (<p>Loading...</p>)
  
  

  if (!isMobile) {
    console.log("isMobile: ", isMobile)
    console.log("isPortrait: ", isPortrait)
    return (
      <div className='min-w-full'>
        <div className='flex flex-row justify-center gap-12'>
          <div onClick={() => handleChangeWeekClick(-1)}>{"<-"}  Forrige uge</div>
          <div className=''>{'Uge ' + weekInfo.weekNumber + ' - ' + weekInfo.firstDayOfWeek.getFullYear()}</div>
          <div onClick={() => handleChangeWeekClick(1)}>Næste uge {"->"}</div>
        </div>

        <table className="min-w-full border-collapse border-gray-300 mb-5 mt-5">
          <thead>
            <tr>
              <th className="w-14"></th>
              {weekInfo.weekDays.map((day, index) => (
                <th key={index} className="p-2 w-20">
                  {daysInWeek[index] + ' ' + day.getDate() + '/' + (day.getMonth() + 1)}
                </th>
              ))}
            </tr>
          </thead>
        </table>

        <table className="min-w-full">
          <tbody>
            {timeSlots.map(time => (
              <tr key={time}>
                <td className="relative h-6 w-14 text-right -top-3 right-2">
                  {time.endsWith(':00') ? time : ''}</td>
                {weekInfo.weekDays.map((day, index) => (
                  <td key={`${day}-${time}`}
                    className={`h-6 w-20 border-b-2 border-t-2 ${index == 0 ? '' : 'border-l-2'}`}
                    onClick={() => handleCellClick(time, day)}>


                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className='right-0'>
          {/* Render the modal outside the loop */}
          {isOpen && selectedCell && (
            <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
            className='right-0'
          >
            <ModalContent className='right-0'>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      
                      label="Email"
                      placeholder="Enter your email"
                      variant="bordered"
                    />
                    <Input
                      
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                      variant="bordered"
                    />
                    <div className="flex py-2 px-1 justify-between">
                      <Checkbox
                        classNames={{
                          label: "text-small",
                        }}
                      >
                        Remember me
                      </Checkbox>
                      <Link color="primary" href="#" size="sm">
                        Forgot password?
                      </Link>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Sign in
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          )}
        </div>
      </div>

    );

  }



  
}







export default CalendarWeekView;