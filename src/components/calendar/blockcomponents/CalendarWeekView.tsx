"use client"
import React, { use, useEffect, useState } from 'react';
import getISOWeek from 'date-fns/getISOWeek';
import startOfWeek from 'date-fns/startOfWeek';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import addDays from 'date-fns/addDays';
import { endOfWeek } from 'date-fns';
import { addWeeks } from 'date-fns';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Link, Input } from "@nextui-org/react"
import useFetchBookings from '@/hooks/fetchBookings';
import { Booking } from '@/types/Booking';


const daysInWeek: string[] = ['Mandag', 'Tirdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
const monthsInYear: string[] = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
const currentDate = new Date();
//currentDate.setHours(1, 0, 0, 0);

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
  const [selectedCell, setSelectedCell] = useState<{ time: string; day: Date, booking?: Booking } | null>(null);



  const [weekInfo, setWeekInfo] = useState({
    monthsInYearIndex: currentDate.getMonth(),
    firstDayOfWeek: startOfWeek(currentDate, { weekStartsOn: 1 }),
    lastDayOfWeek: endOfWeek(currentDate, { weekStartsOn: 1 }),
    weekNumber: getISOWeek(currentDate),
    weekDays: getWeekDays(startOfWeek(currentDate))
  })




  const { bookings, isLoading } = useFetchBookings(employeeId, weekInfo.firstDayOfWeek, weekInfo.lastDayOfWeek);



  useEffect(() => {
    isLoading;
  })

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
      const newDate = addWeeks(new Date(prevWeekInfo.firstDayOfWeek), weekSwap);
      newDate.setHours(newDate.getHours() + 1);
      return {
        monthsInYearIndex: newDate.getMonth(),
        firstDayOfWeek: startOfWeek(newDate, { weekStartsOn: 1 }),
        lastDayOfWeek: endOfWeek(newDate, { weekStartsOn: 1 }),
        weekNumber: getISOWeek(newDate),
        weekDays: getWeekDays(startOfWeek(newDate))
      };
    });

  }

  const handleCellClick = (timeSlot: string, day: Date, booking?: Booking,) => {
    setSelectedCell({ time: timeSlot, day, booking });
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

  function formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


  function isBookingStartingNow(booking: Booking, day: Date, timeslot: string) {
    if (booking.bookingDate.toString() == formatDateToYYYYMMDD(day)) {
      if (booking.bookingStartTime.substring(0, 4) == timeslot.substring(0, 4)) {

        return true;
      }
    }
    return false;
  }

  function isBookingOngoing(booking: Booking, day: Date, timeslot: string) {
    if (booking.bookingDate.toString() == formatDateToYYYYMMDD(day)) {
      if (booking.bookingStartTime.substring(0, 4) < timeslot.substring(0, 4) && booking.bookingEndTime.substring(0, 4) > timeslot.substring(0, 4)) {
        return true;
      }
    }
    return false;
  }


  function calculateRowSpan(bookingStarts: Booking) {
    const startTime = new Date(`December 08, 2023 ${bookingStarts.bookingStartTime}`);
    const endTime = new Date(`December 08, 2023 ${bookingStarts.bookingEndTime}`);
    const spanDuration = ((endTime.getTime() - startTime.getTime()) / 1000 / 60) / timeSlotSize;
    return spanDuration;
  }

  if (!isMobile) {
    return (
      <div className='min-w-full'>
        <div className='flex flex-row justify-center gap-12'>
          <div onClick={() => handleChangeWeekClick(-1)}>{"<-"}  Forrige uge</div>
          <div className=''>{'Uge ' + weekInfo.weekNumber + ' - ' + weekInfo.firstDayOfWeek.getFullYear()}</div>
          <div onClick={() => handleChangeWeekClick(1)}>Næste uge {"->"}</div>
        </div>
        <div className=''>

          <table className="min-w-full">
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
            <tbody>
              {timeSlots.map(time => (
                <tr key={time}>
                  <td className="relative h-6 w-14 text-right -top-3 right-2">
                    {time.endsWith(':00') ? time : ''}</td>
                  {weekInfo.weekDays.map((day, index) => {

                    const bookingStarts = bookings?.find(booking =>
                      isBookingStartingNow(booking, day, time));

                    const bookingOngoing = bookings?.find(booking =>
                      isBookingOngoing(booking, day, time));

                    if (bookingStarts) {

                      return (
                        <td key={`${day}-${time}`}
                          className={`h-6 w-20 border-b-2 border-t-2 bg-green-500 rounded-md pointer:cursor hover:bg-green-300`}
                          onClick={() => handleCellClick(time, day, bookingStarts)}
                          rowSpan={calculateRowSpan(bookingStarts)}
                        >{bookingStarts.customer?.firstName} {bookingStarts.customer?.lastName} <br />
                          {bookingStarts.bookingStartTime} - {bookingStarts.bookingEndTime}</td>
                      )
                    }

                    if (!bookingStarts && !bookingOngoing) {
                      return (
                        <td key={`${day}-${time}`}
                          className={`h-6 w-20 border-b-2 border-t-2 ${index == 0 ? '' : 'border-l-2'}`}
                          onClick={() => handleCellClick(time, day)}>
                        </td>)
                    } else {
                      return null;
                    }


                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='right-0'>
          {/* Render the modal outside the loop */}
          {isOpen && selectedCell && (
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="top-center"
            >
              <ModalContent className='right-0'>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">{selectedCell.booking ? 'Eksisterende booking': 'Ny booking'}</ModalHeader>
                    <ModalBody>


                      <Input
                        label="Dato"
                        placeholder={selectedCell.booking ? selectedCell.booking.bookingDate.toString() : selectedCell.day.toString()}
                        variant="bordered"
                      />
                      <Input


                        label="Starttid"
                        placeholder={selectedCell.booking ? selectedCell.booking.bookingStartTime : selectedCell.time}
                        variant="bordered"
                      />
                      <Input

                        label="Sluttid"
                        placeholder={selectedCell.booking?.bookingEndTime}

                        variant="bordered"
                      />
                      <Input

                        label="Navn"
                        placeholder={
                          selectedCell.booking ? selectedCell.booking?.customer?.firstName + ' ' + selectedCell.booking?.customer?.lastName: ''
                        }

                        variant="bordered"
                      />
                      <Input

                        label="Kategori"
                        placeholder={selectedCell.booking?.category?.name}

                        variant="bordered"
                      />

                      <div className="flex py-2 px-1 justify-between">

                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Annuller
                      </Button>

                      {selectedCell.booking ? <Button color="primary" onPress={onClose}>
                        Opdater Booking
                      </Button> : 
                      <Button color="primary" onPress={onClose}>
                      Opret Booking
                    </Button>}
                      
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