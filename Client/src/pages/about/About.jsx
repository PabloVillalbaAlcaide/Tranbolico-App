import React from 'react';
import { Row, Col } from 'react-bootstrap';
import "../../App.css";
import "./About.scss";

export const About = () => {
  return (
    <div>
      {/* Sección Conócenos */}
      <Row className="conocenos align-items-center">
        <Col xs={8}>
          <span>Conócenos</span>
        </Col>
        <Col xs={4} className="imagen-rabbit">
          <img src="/images/Trambólico2.png" alt="Trambolico2" width={"150px"} />
        </Col>
      </Row>

      {/* Sección Cómo funciona */}
      <div className="como-funciona">
        <h3>¿Cómo funciona?</h3>
        <Row className="funciona-content">
          <Col xs={12} md={6} className="funciona-item">
            <h2>Elige trayecto y horario de recogida</h2>
            <span>Escoge desde dónde necesitas trasladarte hacia Castellón en el horario que mejor te convenga.</span>
          </Col>
          <Col xs={12} md={6} className="funciona-item">
            <h2>Añade tu complemento</h2>
            <span>Escoge el complemento que necesitas para tu viaje.</span>
          </Col>
          <Col xs={12} md={6} className="funciona-item">
            <h2>Elige trayecto y horario de vuelta</h2>
            <span>Escoge desde dónde necesitas trasladarte hacia Castellón en el horario que mejor te convenga.</span>
          </Col>
          <Col xs={12} md={6} className="funciona-item">
            <h2>Realiza el pago</h2>
            <span>Una vez definido el complemento y trayecto, solo queda hacer el pago y empezar a disfrutar de la vuelta a casa sin esperas.</span>
          </Col>
        </Row>
      </div>

      {/* Sección Amarillo con imagen y título */}
      <Row className="Amarillo align-items-center">
        <Col xs={6} className="d-flex align-items-center">
          <img src="/images/Trambólico11.png" alt="Trambolico2" width={"200px"} />
        </Col>
        <Col xs={6}>
          <h3>¿Qué dicen de nosotros?</h3>
        </Col>
      </Row>

      {/* Sección de Testimonios */}
      <Row className="testimonios">
        <Col xs={12} md={6} className="d-flex align-items-start">
          <div className="testimonio">
            <p>Descubre nuestra oferta de actividades, ocio, y restauración a las que asistir el día que contrates el trayecto.</p>
          </div>
        </Col>
        <Col xs={12} md={6} className="d-flex align-items-start">
          <div className="testimonio">
            <p>Descubre nuestra oferta de actividades, ocio, y restauración a las que asistir el día que contrates el trayecto.</p>
          </div>
        </Col>
        <Col xs={12} md={6} className="d-flex align-items-start">
          <div className="testimonio">
            <p>Descubre nuestra oferta de actividades, ocio, y restauración a las que asistir el día que contrates el trayecto.</p>
          </div>
        </Col>
        <Col xs={12} md={6} className="d-flex align-items-start">
          <div className="testimonio">
            <p>Descubre nuestra oferta de actividades, ocio, y restauración a las que asistir el día que contrates el trayecto.</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};
