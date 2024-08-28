import { Accordion, Row } from "react-bootstrap";
import "./Faqs.scss";
import tranbolic4 from "/images/Trambólico4.png";

export const Faqs = () => {
  return (
    <>
      <div>
        <Row className="mt-4 banner-faqs d-flex align-items-center justify-content-between justify-content-center">
          <div className="ppal-faqs ps-5 flex-grow-1">
            <h2 className=" pb-2 m-0">FAQS</h2>
          </div>
          <img src={tranbolic4} alt="tranbolic4" className="faqs-image" />
        </Row>

        <div className="faqs-preguntasYrespuestas d-flex align-items-center justify-content-center flex-column pt-3 pb-5 m-auto">
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <p>¿Cómo puedo reservar un viaje?</p>
              </Accordion.Header>
              <Accordion.Body>
                <span>
                  Puedes reservar tu viaje directamente a través de la app. Solo
                  necesitas seleccionar la ruta deseada, el horario de ida y
                  vuelta, y confirmar tu reserva realizando el pago dentro de la
                  misma aplicación.
                </span>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <p>¿Qué rutas están disponibles?</p>
              </Accordion.Header>
              <Accordion.Body>
                <span>
                  Las rutas disponibles están preestablecidas y conectan varias
                  ciudades para ofrecerte la mejor experiencia de ocio nocturno.
                  Puedes consultar las rutas específicas dentro de la app.
                </span>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <p>¿Cuáles son los horarios de los viajes?</p>
              </Accordion.Header>
              <Accordion.Body>
                <span>
                  Los viajes están programados para los viernes, sábados y
                  vísperas de festivo noche. Los horarios de ida y vuelta están
                  predefinidos y puedes elegir el que más te convenga al momento
                  de realizar tu reserva.
                </span>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <p>¿Cómo realizo el pago de mi reserva?</p>
              </Accordion.Header>
              <Accordion.Body>
                <span>
                  El pago se realiza directamente a través de la app en el
                  momento de confirmar tu reserva. Aceptamos diferentes métodos
                  de pago para tu comodidad.
                </span>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <p>¿Qué recibo después de hacer la reserva?</p>
              </Accordion.Header>
              <Accordion.Body>
                <span>
                  Después de realizar tu reserva y el pago, recibirás un código
                  QR en tu móvil. Este código QR será tu billete para el viaje,
                  por lo que es importante que lo tengas disponible al momento
                  de subir al bus.
                </span>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>
                <p>¿Qué debo hacer si no recibo el código QR?</p>
              </Accordion.Header>
              <Accordion.Body>
                <span>
                  Si no recibes tu código QR después de la reserva, verifica
                  primero que la transacción se haya completado correctamente.
                  Si todo está en orden pero aún no has recibido el QR, por
                  favor contacta con nuestro servicio de atención al cliente a
                  través de la app para asistencia.
                </span>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>
                <p>¿Puedo cambiar mi reserva después de haberla realizado?</p>
              </Accordion.Header>
              <Accordion.Body>
                <span>
                  Las reservas son definitivas una vez confirmadas, por lo que
                  no es posible realizar cambios. Te recomendamos revisar
                  cuidadosamente los horarios y rutas antes de completar tu
                  reserva.
                </span>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7">
              <Accordion.Header>
                <p>¿Es posible cancelar una reserva?</p>
              </Accordion.Header>
              <Accordion.Body>
                <span>
                  Debido a la naturaleza de los servicios, las reservas no son
                  reembolsables ni pueden ser canceladas una vez realizadas. Por
                  favor asegúrate de estar seguro antes de confirmar tu reserva.
                </span>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="8">
              <Accordion.Header>
                <p>¿Qué necesito para subir al bus?</p>
              </Accordion.Header>
              <Accordion.Body>
                <span>
                  Para subir al bus, solo necesitas mostrar el código QR que
                  recibiste en tu móvil al personal encargado. Asegúrate de que
                  el código QR sea legible en la pantalla de tu dispositivo.
                </span>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="9">
              <Accordion.Header>
                <p>¿Qué pasa si pierdo el bus de vuelta?</p>
              </Accordion.Header>
              <Accordion.Body>
                <span>
                  Es importante que te asegures de estar en el punto de
                  encuentro a la hora establecida para la vuelta. Si pierdes el
                  bus, no se ofrece reembolso ni se programan viajes
                  adicionales, por lo que ser puntual es esencial.
                </span>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="10">
              <Accordion.Header>
                <p>¿La app está disponible para todas las ciudades?</p>
              </Accordion.Header>
              <Accordion.Body>
                <span>
                  Por ahora, la app está disponible solo para rutas específicas
                  entre ciertas ciudades. Sin embargo, estamos trabajando para
                  ampliar nuestro servicio a más áreas en el futuro.
                </span>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="11">
              <Accordion.Header>
                <p>¿Puedo compartir mi código QR con otra persona?</p>
              </Accordion.Header>
              <Accordion.Body>
                <span>
                  El código QR es único y está vinculado a la persona que
                  realiza la reserva. No se recomienda compartirlo, ya que
                  podría invalidarse si se detecta uso fraudulento
                </span>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="12">
              <Accordion.Header>
                <p>¿Hay alguna restricción de edad para usar la app?</p>
              </Accordion.Header>
              <Accordion.Body>
                <span>
                  Sí, debido a la naturaleza de los viajes nocturnos y la
                  actividad de ocio, solo pueden hacer reservas personas mayores
                  de 16 años
                </span>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </>
  );
};
