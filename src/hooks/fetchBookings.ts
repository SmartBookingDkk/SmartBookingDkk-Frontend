import { useState, useEffect } from 'react'
import { Booking } from '@/types/Booking'

function useFetchBookings(employeeId: number, startDate: Date, endDate: Date) {
  const [bookings, setData] = useState<Booking[] | null>(null);
  const [isLoading, setLoading] = useState(true)

  const startDateString = startDate.getFullYear().toString() +
  '-' +
   ((startDate.getMonth() + 1).toString().length==1? '0' + (startDate.getMonth() + 1).toString(): (startDate.getMonth() + 1).toString()) +
    '-' +
   (startDate.getDate().toString().length==1? '0' + startDate.getDate().toString(): startDate.getDate().toString());
  
  const endDateString = endDate.getFullYear().toString() +
  '-' + 
  ((endDate.getMonth() + 1).toString().length==1? '0' + (endDate.getMonth() + 1).toString(): (endDate.getMonth() + 1).toString()) +
   '-' +
   (endDate.getDate().toString().length==1? '0' + endDate.getDate().toString(): endDate.getDate().toString());
    



  useEffect(() => {
    fetch(`http://localhost:8080/booking/${employeeId}?startDate=${startDateString}&endDate=${endDateString}`)
      .then((res) => res.json())
      .then((bookings) => {
        setData(bookings)
        setLoading(false)
      })
  }, [])

  return { bookings, isLoading }
}

export default useFetchBookings;