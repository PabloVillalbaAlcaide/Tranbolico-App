import React, { useState } from "react";
import { Accordion, Form } from "react-bootstrap";

export const AdminUser = ({ full_name, birthdate, email, phone_number }) => {
  const [userData] = useState({});
  const [reservationHistory] = useState([]);
  const [futureReservations] = useState([]);
  return (
    <>
      <div className="padre-contenedor-userView d-flex flex-row">
        <div className="contenedor-userView d-flex flex-column p-3 align-items-center justify-content-center m-auto">
          <br />
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0" className="accordion-user">
              <Accordion.Header>
                <h4>{full_name}</h4>
              </Accordion.Header>
              <Form>
                <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch"
                  label="Habilitar Usuario"
                />
              </Form>
              <Accordion.Body>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <strong>Datos</strong>
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>
                        Nombre:
                        {full_name}
                      </p>
                      <p>Teléfono: {phone_number}</p>
                      <p>
                        Email:
                        {email}
                      </p>
                      <p>
                        Fecha de Nacimiento:
                        {birthdate}
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Accordion.Body>

              <Accordion.Body>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <strong>Historial</strong>
                    </Accordion.Header>
                    <Accordion.Body></Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Accordion.Body>
              <Accordion.Body>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <strong>Reservas</strong>
                    </Accordion.Header>
                    <Accordion.Body></Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>

      {/* <div >
      
        <div > 
         
          
            
              
              
             
               
                  </div>
                 
      </div> */}

      {/* <div className="padre-contenedor-userView d-flex flex-row">
        <div className="contenedor-userView d-flex flex-column p-3 align-items-center justify-content-center m-auto">
          <br />
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0" className="accordion-user">
              <Accordion.Header>
                <h4>nombre</h4>
              </Accordion.Header>
              <Form.ChecK
                type="checkbox"
                label="Deshabilitar usuario"
                // checked={isDisabled}
                // onChange={handleCheckboxChange}
              ></Form.ChecK>
              <Accordion.Body>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <strong>Datos</strong>
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>
                        Nombre:
                        {userData.name}
                      </p>
                      <p>Teléfono: {userData.phone_number}</p>
                      <p>
                        Email:
                        {userData.email}
                      </p>
                      <p>
                        Fecha de Nascimiento:
                        {userData.birthdate}
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <strong>Historial de Reservas</strong>
                    </Accordion.Header>
                    <Accordion.Body>
                      {reservationHistory.length > 0 ? (
                        reservationHistory.map((reservation, index) => (
                          <div key={index}>
                            <p>
                              <strong>Reserva:</strong>{" "}
                              {reservation.reservation_id}
                            </p>
                            <p>
                              <strong>Hora:</strong>{" "}
                              {reservation.departure_time}
                            </p>
                            <p>
                              <strong>Día:</strong> {reservation.departure_date}
                            </p>
                            <p>
                              <strong>Precio:</strong> {reservation.price}
                            </p>
                            <hr />
                          </div>
                        ))
                      ) : (
                        <p>No hay historial de reservas.</p>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      <strong>Futuras Reservas</strong>
                    </Accordion.Header>
                    <Accordion.Body>
                      {futureReservations.length > 0 ? (
                        futureReservations.map((reservation, index) => (
                          <div key={index}>
                            <p>
                              <strong>Reserva:</strong>
                              {reservation.reservation_id}
                            </p>
                            <p>
                              <strong>Hora:</strong>
                              {reservation.departure_time}
                            </p>
                            <p>
                              <strong>Día:</strong>
                              {reservation.departure_date}
                            </p>
                            <p>
                              <strong>Precio:</strong>
                              {reservation.price}
                            </p>
                            <hr />
                          </div>
                        ))
                      ) : (
                        <p>No hay reservas futuras.</p>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div> */}
    </>
  );
};
