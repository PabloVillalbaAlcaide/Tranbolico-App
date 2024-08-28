import "../../App.css";
import "./detailReservation.scss";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useContext } from "react";
import { AppContext } from "../../context/TranbolicoContextProvider";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { ButtonTram } from "../../components/ButtonTram/ButtonTram";
import { format } from "date-fns";

export const DetailReservation = () => {
  const { reservation } = useOutletContext();
  const navigate = useNavigate();
  const { globalState } = useContext(AppContext);

  const confirmReservation = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/reservation/setReservation`,
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
      <Container fluid className="detailReservation">
        <ProgressBar />
        <Row className="py-4 gap-4 flex-column justify-content-center align-items-center">
          <Col className="resumen-reseva d-flex flex-column justify-content-center align-items-center gap-3">
            <h4 className="fst-italic fw-bold">Resumen de la reserva</h4>
            <div className="d-flex flex-column gap-2">
              <h5 className="fw-bold">Trayecto:</h5>
              <p>
                {reservation?.departure_city} - {reservation?.arrival_city}
              </p>
              <h5 className="fw-bold">Ida:</h5>
              <div className="d-flex gap-4">
                <div className="boton-detail-date-reservation">
                  {format(new Date(reservation?.departure_date), "dd-MM-yyyy")}
                </div>
                <div className="boton-detail-time-reservation">
                  {reservation?.departure_time}
                </div>
              </div>
              <h5 className="fw-bold">Vuelta:</h5>
              <div className="d-flex gap-4">
                <div className="boton-detail-date-reservation">
                  {format(new Date(reservation?.arrival_date), "dd-MM-yyyy")}
                </div>
                <div className="boton-detail-time-reservation">
                  {reservation?.arrival_time}
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
            <div className="buttons-Details">
              <ButtonTram
                fontSize="1.3rem"
                color="black"
                backgroundColor="var(--tranbolico-verde)"
                onClick={confirmReservation}
              >
                Confirmar
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
                onClick={() => navigate("/")}
              >
                Cancelar
              </ButtonTram>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
