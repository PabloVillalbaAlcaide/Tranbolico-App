import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { AppContext } from "../../../context/TranbolicoContextProvider";

export const AddNewPlanningModal = ({ show, onHide, onSave }) => {
  const [route, setRoute] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedRoute, setSelectedRoute] = useState({});
  const { globalState } = useContext(AppContext);
  const [routesList, setRoutesList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSelectedRoute({});
    setError("");
  }, [show]);

  const getPlanningRoutes = async (value) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/admin/getPlanningRoutes?search=${value}`,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );

      setRoutesList(res.data);
      setShowDropdown(true);
    } catch (error) {
      console.error(error);
      setError("Error al obtener las rutas. Por favor, inténtalo de nuevo.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "route":
        if (value === "") {
          setShowDropdown(false);
        } else {
          getPlanningRoutes(value);
        }
        setRoute(value);
        break;
      case "date":
        setDate(value);
        break;
      case "time":
        setTime(value);
        break;
      default:
        break;
    }
  };

  const handleSelectRoute = (routeItem) => {
    setSelectedRoute({
      ...routeItem,
      departure_date: date,
      departure_time: time,
    });
    setRoute(
      `${routeItem.departure_city_name} - ${routeItem.arrival_city_name}`
    );
    setShowDropdown(false);
  };

  const handleSave = () => {
    if (Object.keys(selectedRoute).length !== 0 && date && time) {
      const newPlanning = {
        ...selectedRoute,
        departure_date: date,
        departure_time: time,
      };
      onSave(newPlanning);
      setRoute("");
      setDate("");
      setTime("");
      setSelectedRoute({});
      setError("");
      onHide();
    } else {
      setError("Faltan datos");
    }
  };

  return (
    <Modal show={show} onHide={onHide} className="akkurat-font">
      <Modal.Header closeButton>
        <Modal.Title>Añadir Nuevo Planning</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="route">
            {error !== "" && (
              <p
                style={{
                  fontWeight: "12px",
                  color: "crimson",
                  textAlign: "center",
                }}
              >
                {error}
              </p>
            )}
            <Form.Label>Ruta</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la ruta"
              value={route}
              onChange={handleChange}
              name="route"
            />
            {showDropdown && routesList.length > 0 && (
              <Dropdown.Menu show>
                {routesList.map((routeItem) => (
                  <Dropdown.Item
                    key={routeItem.route_id}
                    onClick={() => handleSelectRoute(routeItem)}
                  >
                    {`${routeItem.departure_city_name} - ${routeItem.arrival_city_name}`}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            )}
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={handleChange}
              name="date"
            />
          </Form.Group>
          <Form.Group controlId="time">
            <Form.Label>Hora</Form.Label>
            <Form.Control
              type="time"
              value={time}
              onChange={handleChange}
              name="time"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{
            backgroundColor: "var(--tranbolico-rosa)",
            color: "black",
            border: "none",
          }}
          onClick={() => {
            onHide();
            setRoute("");
            setDate("");
            setTime("");
            setSelectedRoute({});
            setError("");
          }}
        >
          Cancelar
        </Button>
        <Button
          style={{
            backgroundColor: "var(--tranbolico-azulClaro)",
            color: "black",
            border: "none",
          }}
          onClick={handleSave}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
