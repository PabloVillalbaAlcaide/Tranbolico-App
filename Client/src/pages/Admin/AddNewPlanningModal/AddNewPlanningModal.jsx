import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AppContext } from "../../../context/TranbolicoContextProvider";

const AddNewPlanningModal = ({ show, onHide, onSave }) => {
  const [route, setRoute] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { globalState, loading } = useContext(AppContext);
  const [routesList, setRoutesList] = useState([]);

  useEffect(() => {
    if (globalState.token && !loading) {
      getPlanningRoutes();
    }
  }, [globalState.token, loading]);

  const getPlanningRoutes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/admin/getPlanningRoutes?search=${route}`,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );
      setRoutesList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "route":
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

  const handleSave = () => {
    // Aquí puedes manejar la lógica para guardar la información
    onSave({ route, date, time });
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
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewPlanningModal;
