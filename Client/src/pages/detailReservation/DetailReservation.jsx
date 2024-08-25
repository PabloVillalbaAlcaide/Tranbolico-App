import "../../App.css";
import "./detailReservation.scss";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useContext } from "react";
import { AppContext } from "../../context/TranbolicoContextProvider";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";

export const DetailReservation = () => {
  const { reservation } = useOutletContext();
  const navigate = useNavigate();
  const { globalState } = useContext(AppContext);

  const confirmReservation = async () => {
    try {
      await axios.post(
        `http://localhost:4000/reservation/setReservation`,
        reservation,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );
      navigate("/confirmReservation");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <main>
        <Container fluid>
          <ProgressBar />
          <Row className="py-4 gap-4 flex-column justify-content-center align-items-center">
            <Col className="resumen-reseva d-flex flex-column justify-content-center align-items-center gap-3">
              <h4 className="fst-italic">Realizar el pago</h4>
              <div className="d-flex flex-column gap-2">
                <h5 className="fw-bold">- Trayecto</h5>
                <p>
                  {reservation.departure_city} - {reservation.arrival_city}
                </p>
                <h5 className="fw-bold">- Ida</h5>
                <div className="d-flex gap-4">
                  <div className="boton-detail-date-reservation">
                    {reservation.departure_date}
                  </div>
                  <div className="boton-detail-time-reservation">
                    {reservation.departure_time}
                  </div>
                </div>
                <h5 className="fw-bold">- Vuelta</h5>
                <div className="d-flex gap-4">
                  <div className="boton-detail-date-reservation">
                    {reservation.arrival_date}
                  </div>
                  <div className="boton-detail-time-reservation">
                    {reservation.arrival_time}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                <h5 className="fw-bold desglose-precio">
                  Viaje de ida y vuelta: <span>7,60€</span>
                </h5>
                <h5 className="fw-bold desglose-precio">
                  Guía turístico: <span>4,40€</span>
                </h5>
                <h5 className="fw-bold desglose-precio">
                  Total: <span>12€</span>
                </h5>
              </div>
            </Col>

            <Col>
              <div className="d-flex justify-content-center gap-4">
                <Button
                  style={{
                    backgroundColor: "var(--tranbolico-azulClaro)",
                    color: "black",
                    border: "none",
                  }}
                  onClick={confirmReservation}
                >
                  Confirmar
                </Button>
                <Button
                  style={{
                    backgroundColor: "var(--tranbolico-amarillo)",
                    color: "black",
                    border: "none",
                  }}
                  onClick={() => navigate(-1)}
                >
                  Atras
                </Button>
                <Button
                  style={{
                    backgroundColor: "var(--tranbolico-rosa)",
                    color: "black",
                    border: "none",
                  }}
                  onClick={() => navigate("/")}
                >
                  Cancelar
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};
