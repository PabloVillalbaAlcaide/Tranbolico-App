import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export const GetReservations = () => {
  const [reservation, setReservation] = useState();
  const location = useLocation();
  const route = location.state;
  const [loadingReservation, setLoadingReservation] = useState(true)

  useEffect(() => {
    const storedReservation = sessionStorage.getItem("reservation");
  
    if (!reservation && storedReservation) {
      setReservation(JSON.parse(storedReservation));
    } else if (reservation && storedReservation !== JSON.stringify(reservation)) {
      sessionStorage.setItem("reservation", JSON.stringify(reservation));
    }
    setLoadingReservation(false)
  }, [reservation]);

  return (
    <>
      <Outlet context={{ reservation, setReservation, route, loadingReservation }} />
    </>
  );
};