import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

export const GetReservations = () => {
  const [reservation, setReservation] = useState({})
  const location = useLocation();
  const route = location.state;
  
  return (
    <>
    <Outlet context={{reservation, setReservation, route}}/>
    </>
  )
}
