import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
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
      sessionStorage.setItem("reservation", JSON.stringify(reservation));
    }
    setLoadingReservation(false);
  }, [reservation]);

  return (
    <>
      {/* <Row>
        <div className="ppal-rutas text-center text-white mt-2">
          <h2 className="mb-0 py-2">RESERVAS</h2>
        </div>
      </Row> */}
      <TitleTram backgroundColor={'var(--tranbolico-fucsia)'} color={"white"}>
        RESERVAS
      </TitleTram>
      <Outlet
        context={{ reservation, setReservation, route, loadingReservation }}
      />
    </>
  );
};
