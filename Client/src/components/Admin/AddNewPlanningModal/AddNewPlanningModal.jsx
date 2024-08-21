import axios from "axios";
import { useContext, useState } from "react";
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

  const getPlanningRoutes = async (value) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/admin/getPlanningRoutes?search=${value}`,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );

      setRoutesList(res.data);
      setShowDropdown(true);
    } catch (error) {
      console.log(error);
      // Consider showing an error message to the user
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
    const newPlanning = {
      ...selectedRoute,
      departure_date: date,
      departure_time: time,
    };
    onSave(newPlanning);
    setRoute("");
    setDate("");
    setTime("");
    onHide(); // Cierra el modal
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir Nuevo Planning</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="route">
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
          variant="secondary"
          onClick={() => {
            onHide();
            setRoute("");
            setDate("");
            setTime("");
          }}
        >
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
