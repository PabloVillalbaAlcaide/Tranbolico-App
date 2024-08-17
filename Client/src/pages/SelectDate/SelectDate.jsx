import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import TranbolicoDatePicker from "../../components/DatePicker/DatePicker";
import { AppContext } from "../../context/TranbolicoContextProvider";
import axios from "axios";
import { Button } from "react-bootstrap";

export const SelectDate = () => {
  const { reservation, setReservation, route } = useOutletContext();
  const [departurePlanningList, setDeparturePlanningList] = useState([]);
  const [date, setDate] = useState("");
  const { globalState } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(route);

  useEffect(() => {
    const provDeparture =
      location.pathname === "/reservations" ? route?.origin : route?.destination;
    const provArrival =
      location.pathname === "/reservations" ? route?.destination : route?.origin;

    getSchedules(provDeparture, provArrival);
  }, []);

  useEffect(() => {
    let newReservation = {
      departure_province: route?.origin.province,
      departure_city: route?.origin.city,
      arrival_province: route?.destination.province,
      arrival_city: route?.destination.city,
    };
    if (location.pathname === "/reservations") {
      newReservation = { ...newReservation, departure_date: date };
    }
    else{
      newReservation = { ...newReservation, arrival_date: date };
    }
    setReservation(
      newReservation
    );
  }, [date]);

  const nextStep = () => {
    if (
      location.pathname === "/reservations" &&
      reservation.departure_date !== ""
    ) {
      navigate("/reservations/returnDate");
    } else if (
      location.pathname === "/reservations/returnDate" &&
      reservation.arrival_date !== ""
    ) {
      navigate("/reservations/detailReservation");
    }
  };

  console.log(reservation);

  const getSchedules = async (departure, arrival) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/reservation/getSchedules`,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
          params: {
            origin_city: departure.city,
            origin_province: departure.province,
            destination_city: arrival.city,
            destination_province: arrival.province,
          },
        }
      );

      setDeparturePlanningList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <TranbolicoDatePicker
          date={date}
          setDate={setDate}
          planningList={departurePlanningList}
        />
        <Button onClick={nextStep}>Continuar</Button>
      </div>
    </>
  );
};
