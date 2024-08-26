import { useEffect, useLayoutEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TitleTram } from "../../components/TitleTram/TitleTram";

export const GetReservations = () => {
  const [reservation, setReservation] = useState();
  const location = useLocation();
  const route = location.state;
  const [loadingReservation, setLoadingReservation] = useState(true);

  useEffect(() => {    
    const storedReservation = sessionStorage.getItem("reservation");

    if (!reservation && storedReservation) {
      setReservation(JSON.parse(storedReservation));
      
    } else if (
      reservation &&
      storedReservation !== JSON.stringify(reservation)
    ) {
      console.log(reservation);
      
      sessionStorage.setItem("reservation", JSON.stringify(reservation));
    }
    setLoadingReservation(false);
  }, [reservation]);

  return (
    <>
      <TitleTram backgroundColor={'var(--tranbolico-fucsia)'} color={"white"}>
        RESERVAS
      </TitleTram>
      <Outlet
        context={{ reservation, setReservation, route, loadingReservation }}
      />
    </>
  );
};
