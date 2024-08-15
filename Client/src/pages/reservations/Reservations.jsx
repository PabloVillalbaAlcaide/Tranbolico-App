import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

export const Reservations = () => {
  const [reservation, setReservation] = useState({})
  const location = useLocation();
  const ruta = location.state;
  
  return (
    <>
    <Outlet context={{reservation, setReservation}}/>
    </>
  )
}
