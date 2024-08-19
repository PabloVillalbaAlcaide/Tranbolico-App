import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import TranbolicoDatePicker from "../../components/DatePicker/DatePicker";
import { AppContext } from "../../context/TranbolicoContextProvider";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./selectDate.scss";

export const SelectDate = () => {
  const { reservation, setReservation, route } = useOutletContext();
  const [planningList, setPlanningList] = useState([]);
  const [date, setDate] = useState("");
  const { globalState } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const provDeparture =
      location.pathname === "/reservations"
        ? route?.origin
        : {
            province: reservation.arrival_province,
            city: reservation.arrival_city,
          };
    const provArrival =
      location.pathname === "/reservations"
        ? route?.destination
        : {
            province: reservation.departure_province,
            city: reservation.departure_city,
          };

    getSchedules(provDeparture, provArrival);
  }, [route, location.pathname]);

  useEffect(() => {
    if (location.pathname === "/reservations") {
      let newReservation = {
        user_id: globalState.user.user_id,
        departure_province: route?.origin.province,
        departure_city: route?.origin.city,
        departure_date: date,
        arrival_province: route?.destination.province,
        arrival_city: route?.destination.city,
      };
      setReservation(newReservation);
    } else {
      setReservation({ ...reservation, arrival_date: date });
    }
  }, [date, location.pathname]);

  const nextStep = () => {
    if (
      location.pathname === "/reservations" &&
      reservation.departure_date !== "" &&
      reservation.departure_time
    ) {
      setDate("");
      navigate("/reservations/returnDate");
    } else if (
      location.pathname === "/reservations/returnDate" &&
      reservation.arrival_date &&
      reservation.arrival_time
    ) {
      navigate("/reservations/detailReservation");
    }
  };

  console.log(reservation);
  console.log(planningList);

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

      setPlanningList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const setPlanning = (elem) => {
    if (location.pathname === "/reservations") {
      setReservation({
        ...reservation,
        departure_time: elem.departure_time,
        departure_planning_id: elem.planning_id,
        departure_route_id: elem.route_id,
      });
    } else {
      setReservation({
        ...reservation,
        arrival_time: elem.departure_time,
        arrival_planning_id: elem.planning_id,
        arrival_route_id: elem.route_id,
      });
    }
  };

  return (

<Container fluid className="p-0 m-0 mt-5 mb-5">
    <Row className="justify-content-center selectDatepicker">
      <Col xs={12} md={6} className="d-flex flex-column align-items-center w-100 p-0 m-0">
        <Row className="w-100">
          <Col xs={4} className="d-flex justify-content-center align-items-center p-0 m-0">
            {/* <p>{date}</p> */}<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, deleniti.</p>
          </Col>
          <Col xs={4} className="d-flex justify-content-center align-items-center p-0 m-0">
            <TranbolicoDatePicker
              date={date}
              setDate={setDate}
              planningList={planningList}
            />
          </Col>
          <Col xs={4} className="d-flex flex-column justify-content-center align-items-center p-0 m-0">
            {date ? 
              planningList.map((elem) => {
                if (elem.departure_date === date) {
                  return (
                    <Button
                      key={elem.planning_id}
                      onClick={() => setPlanning(elem)}
                      className="m-2"
                    >
                      {elem.departure_time}
                    </Button>
                  );
                }
              })
            : ""}
          </Col>
        </Row>
      </Col>
    </Row>

      <Row className="justify-content-center mt-3">
        <Col xs={12} md={4} className="d-flex justify-content-around p-0 m-0">
          <Button onClick={nextStep} className="btn btn-success">
            Continuar
          </Button>
          <Button onClick={() => navigate(-1)} className="btn btn-warning">
            Atras
          </Button>
          <Button onClick={() => navigate("/")} className="btn btn-danger">
            Cancelar
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
