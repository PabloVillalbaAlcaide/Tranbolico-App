import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { TranbolicoDatePicker } from "../../components/DatePicker/DatePicker";
import { AppContext } from "../../context/TranbolicoContextProvider";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./selectDate.scss";
import { ButtonTram } from "../../components/ButtonTram/ButtonTram";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";

export const SelectDate = () => {
  const { reservation, setReservation, route, loadingReservation } =
    useOutletContext();
  const [planningList, setPlanningList] = useState([]);
  const [date, setDate] = useState("");
  const { globalState, loading } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loadingReservation && !loading) {
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
    }
  }, [route, location.pathname, loadingReservation, loading]);

  useEffect(() => {

    console.log("Cargando",loading, loadingReservation);

    if (!loadingReservation && !loading) {
      if (location.pathname === "/reservations") {
        let newReservation = {
          user_id: globalState.user.user_id,
          departure_province: route?.origin.province,
          departure_city: route?.origin.city,
          departure_date: date,
          arrival_province: route?.destination.province,
          arrival_city: route?.destination.city,
        };
        console.log("newReservation",newReservation);
        
        setReservation(newReservation);
      } else {
        setReservation({ ...reservation, arrival_date: date });
      }
    }
  }, [date, location.pathname, loadingReservation, loading]);

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

  const getSchedules = async (departure, arrival) => {
    try {
      if (location.pathname === "/reservations") {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/reservation/getSchedules`,
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
      } else {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/reservation/getSchedules`,
          {
            headers: { Authorization: `Bearer ${globalState.token}` },
            params: {
              origin_city: departure.city,
              origin_province: departure.province,
              destination_city: arrival.city,
              destination_province: arrival.province,
              date: reservation.departure_date,
              time: reservation.departure_time,
            },
          }
        );
        setPlanningList(res.data);
      }
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
    <Container
      fluid
      className="p-0 m-0 mt-5 mb-5 d-flex flex-column justify-content-center align-items-center"
    >
      <ProgressBar date={planningList} />

      <Row>
        <h3 className="text-center pb-4 fs-4 mt-1 textEnun akkurat-font">
          Selecciona día de{" "}
          {location.pathname === "/reservations" ? "ida" : "vuelta"}
        </h3>
      </Row>
      <Row className="justify-content-center selectDatepicker">
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column align-items-center w-100 p-0 m-0"
        >
          <div className="grid-container w-100 akkurat-font">
            <div className="fecha d-flex flex-column justify-content-start align-items-center btn-primary">
              <h4>Fecha</h4>
              <p className="mt-3">{date}</p>
            </div>
            <div className="calendario d-flex flex-column justify-content-center align-items-center p-0 m-0">
              <TranbolicoDatePicker
                date={date}
                setDate={setDate}
                planningList={planningList}
              />
            </div>
            <div className="hora d-flex flex-column justify-content-start align-items-center p-0 m-0">
              <h4>Hora/s disponible/s</h4>
              {date
                ? planningList.map((elem) => {
                    if (elem.departure_date === date) {
                      const isSelected =
                        (location.pathname === "/reservations" &&
                          elem.departure_time === reservation.departure_time) ||
                        (location.pathname === "/reservations/returnDate" &&
                          elem.departure_time === reservation.arrival_time);
                      return (
                        <Button
                          key={elem.planning_id}
                          onClick={() => setPlanning(elem)}
                          className={`m-2 btn-date ${
                            isSelected ? "selected" : ""
                          }`}
                        >
                          {elem.departure_time}
                        </Button>
                      );
                    }
                  })
                : ""}
            </div>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col
          xs={12}
          md={4}
          className="d-flex flex-column flex-md-row justify-content-md-around justify-content-center align-items-center p-0 m-0 w-100 gap-4"
        >
          <ButtonTram
            fontSize="1.3rem"
            color="black"
            onClick={nextStep}
            backgroundColor="var(--tranbolico-verde)"
          >
            Continuar
          </ButtonTram>
          <ButtonTram
            fontSize="1.3rem"
            color="black"
            backgroundColor="var(--tranbolico-amarillo)"
            onClick={() => navigate(-1)}
          >
            Atrás
          </ButtonTram>
          <ButtonTram
            fontSize="1.3rem"
            color="black"
            backgroundColor="var(--tranbolico-fucsia)"
            onClick={() => {
              sessionStorage.clear()
              navigate("/")
            }}
          >
            Cancelar
          </ButtonTram>
        </Col>
      </Row>
    </Container>
  );
};
