import { useState, useEffect } from 'react'
import { Booking } from '@/types/Booking'

function useFetchBookings(employeeId: number) {
  const [data, setData] = useState<Booking[] | null>(null);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8080/booking/1')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  return { data, isLoading }
}

export default useFetchBookings;