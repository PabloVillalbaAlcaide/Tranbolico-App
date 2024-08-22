import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Accordion, Form, Alert } from "react-bootstrap";
import { AppContext } from "../../../context/TranbolicoContextProvider";

export const AdminUser = ({
  user_id,
  full_name,
  birthdate,
  email,
  phone_number,
  is_disabled,
}) => {
  const [isChecked, setIsChecked] = useState(true);
  const [reservationHistory, setReservationHistory] = useState([]);
  const [activeKey, setActiveKey] = useState("");
  const [error, setError] = useState(null);
  const { globalState } = useContext(AppContext);
  const [reservation, setReservation] = useState([]);

  //cargamos en isChecked el estado is_disabled del usuario
  useEffect(() => {
    if (is_disabled === 0) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [is_disabled]);

  //modificamos la db el parámetro is_disabled
  const handleChange = async () => {
    setIsChecked(!isChecked);
    try {
      await axios.patch(
        `http://localhost:4000/admin/disableUser`,
        { user_id: user_id, is_disabled: isChecked },
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // nos traer para ver el historial del usuario
  const viewHistory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/admin/historicalUser?userid=${user_id}`,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );
      setReservationHistory(res.data);
    } catch (error) {
      console.error(error);
      setError("Error al cargar el historial de reservas.");
    }
  };

  // nos traer para ver reservas del usuario
  const viewReservation = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/admin/reservationUser?userid=${user_id}`,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );
      console.log(res.data, "de vuelta");
      setReservation(res.data);
    } catch (error) {
      console.error(error);
      setError("Error al cargar el historial de reservas.");
    }
  };

  // select del acordéon
  const handleSelect = (key) => {
    setActiveKey(key);
    if (key === "2") {
      viewHistory();
    }
    setActiveKey(key);
    if (key === "3") {
      viewReservation();
    }
  };

  return (
    <div className="contenedor-userView d-flex flex-column p-3 align-items-center justify-content-center m-auto ">
      <br />
      <Accordion className="w-100" onSelect={handleSelect}>
        <Accordion.Item
          eventKey={activeKey ? activeKey : "0"}
          className="accordion-user p-2"
        >
          <Accordion.Header>
            <h4>{full_name}</h4>
          </Accordion.Header>{" "}
          <Form>
            <Form.Check // prettier-ignore
              className="d-flex align-items-center justify-content-center"
              type="switch"
              id="custom-switch"
              label={isChecked ? "Deshabilitar usuario" : "Habilitar usuario"}
              checked={isChecked}
              onChange={handleChange}
              value={isChecked}
            />
          </Form>
          <Accordion.Body>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <strong>Datos</strong>
              </Accordion.Header>
              <Accordion.Body>
                <p>Nombre: {full_name}</p>
                <p>Teléfono: {phone_number}</p>
                <p>Email: {email}</p>
                <p>Fecha de Nacimiento: {birthdate}</p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <strong>Historial</strong>
              </Accordion.Header>
              <Accordion.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {reservationHistory.length > 0 ? (
                  reservationHistory.map((reservation, index) => (
                    <div key={index}>
                      <p>{reservation.route_name}</p>
                      <p>
                        {reservation.departure_city_name} -{" "}
                        {reservation.arrival_city_name}
                      </p>
                      <p>
                        {reservation.departure_day}&nbsp;&nbsp;/{" "}
                        {reservation.departure_time}
                      </p>
                      <p>12€</p> {/* Precio hardcodeado */}
                      <hr className="hr-viewUser" />
                    </div>
                  ))
                ) : (
                  <p>No hay reservas disponibles.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <strong>Reservas</strong>
              </Accordion.Header>
              <Accordion.Body>
                {reservation.length > 0 ? (
                  reservation.map((elem, index) => (
                    <div key={index}>
                      <p>{elem.route_name}</p>
                      <p>
                        {elem.departure_city_name} - {elem.arrival_city_name}
                      </p>
                      <p>
                        {elem.departure_day}&nbsp;&nbsp;/ {elem.departure_time}
                      </p>
                      <p>12€</p> {/* Precio hardcodeado */}
                      <hr className="hr-viewUser" />
                    </div>
                  ))
                ) : (
                  <p>No hay reservas disponibles.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
