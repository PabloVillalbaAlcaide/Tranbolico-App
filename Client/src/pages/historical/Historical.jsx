import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import "./historical.scss";

export const Historical = () => {
  const [hist, setHist] = useState("historical");

  return (
    <Container>
      <Row>
        <Col>
          <div className="w-100 d-flex justify-content-center mt-5">
            <button
              className={`historical-button ${
                hist === "historical" ? "active" : ""
              }`}
              onClick={() => setHist("historical")}
            >
              Historial de reservas
            </button>
            <button
              className={`historical-button ${
                hist === "nextReservations" ? "active" : ""
              }`}
              onClick={() => setHist("nextReservations")}
            >
              Futuras reservas
            </button>
          </div>
          <Outlet context={{ hist }} />
        </Col>
      </Row>
    </Container>
  );
};
