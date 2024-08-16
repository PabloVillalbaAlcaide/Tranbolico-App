import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';

export const Historical = () => {
  const [hist, setHist] = useState("historical");

  return (
    <Row>
      <Col>
        <div>
          <button onClick={() => setHist("historical")}>Historial de reservas</button>
          <button onClick={() => setHist("nextReservations")}>Futuras reservas</button>
        </div>
        <Outlet context={{ hist }} />
      </Col>
    </Row>
  );
};
