import { Accordion, Row } from "react-bootstrap";
import "./Faqs.scss";
import tranbolic4 from "/images/Trambólico4.png";

export const Faqs = () => {
  return (
    <>
      <div className="contenedor-faqs">
        <Row className="mt-4 banner-faqs d-flex align-items-center justify-content-between justify-content-center">
          <div className="ppal-faqs ps-5 text-white mt-2 flex-grow-1">
            <h2 className=" py-2 m-0">FAQS</h2>
          </div>
          <img src={tranbolic4} alt="tranbolic4" className="faqs-image" />
        </Row>

        <div className="faqs-preguntasYrespuestas d-flex align-items-center justify-content-center flex-column pt-3 pb-5 m-auto">
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <p>¿Cómo funciona el servicio de autobuses nocturnos?</p>
              </Accordion.Header>
              <Accordion.Body>
                <span>
                  Nuestro servicio de autobuses nocturnos opera en horarios
                  extendidos para garantizar que nuestros pasajeros lleguen a
                  sus destinos de manera segura y puntual.
                </span>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <p>¿Es seguro viajar con ustedes?</p>
              </Accordion.Header>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <p>¿Qué áreas cubren sus rutas?</p>
              </Accordion.Header>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <p>¿Puedo reservar un autobús para un grupo grande?</p>
              </Accordion.Header>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <p>¿Qué pasa si tengo que cancelar mi reserva?</p>
              </Accordion.Header>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </>
  );
};
