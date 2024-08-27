import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/TranbolicoContextProvider";
import axios from "axios";
import { Button, Table, Form, Row, Container } from "react-bootstrap";
import { AddNewPlanningModal } from "../../../components/Admin/AddNewPlanningModal/AddNewPlanningModal";
import { format } from "date-fns";
import "./viewAddPlanning.scss";
import "../../../App.css";
import { useNavigate } from "react-router-dom";

export const ViewAddPlanning = () => {
  const navigate = useNavigate();
  const { globalState, loading } = useContext(AppContext);
  const [planningList, setPlanningList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [editing, setEditing] = useState({ routeId: null, planningId: null }); // Estado para el planning en edición
  const [editData, setEditData] = useState({}); // Estado para los datos editados
  const [viewhistorical, setViewhistorical] = useState(false);

  useEffect(() => {
    if (globalState.token && !loading) {
      getPlanning();
    }
  }, [globalState.token, loading, isUpdated, viewhistorical]);

  const getPlanning = async () => {
    try {
      let url = `${import.meta.env.VITE_API_URL}/admin/getPlanning`;
      if(viewhistorical){
        url = `${import.meta.env.VITE_API_URL}/admin/getHistoricalPlanning`
      }
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${globalState.token}` },
      });
      setPlanningList(res.data);
    } catch (error) {
      console.log("Error al obtener el planning:", error);
    }
  };

  const handleSavePlanning = async (newPlanning) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/addPlanning`,
        newPlanning,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );

      if (res.status === 200) {
        setIsUpdated(!isUpdated); // Cambia el estado booleano para actualizar la lista
        setShowModal(false);
      } else {
        alert(
          "Error en la creación del planning. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.log("Error al guardar el nuevo planning:", error);
      alert(
        "Error en la creación del planning. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleDeletePlanning = async (routeId, planningId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/delPlanning/${routeId}/${planningId}`,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );

      if (res.status === 200) {
        setIsUpdated(!isUpdated); // Cambia el estado booleano para actualizar la lista
      } else {
        alert("Error al eliminar el planning. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.log("Error al eliminar el planning:", error);
      alert("Error al eliminar el planning. Por favor, inténtalo de nuevo.");
    }
  };

  const handleEditPlanning = async (routeId, planningId) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/editPlanning/${routeId}/${planningId}`,
        editData,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );

      if (res.status === 200) {
        setIsUpdated(!isUpdated); // Cambia el estado booleano para actualizar la lista
        setEditing({ routeId: null, planningId: null }); // Salir del modo de edición
      } else {
        alert("Error al editar el planning. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.log("Error al editar el planning:", error);
      alert("Error al editar el planning. Por favor, inténtalo de nuevo.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const onEdit = (item) => {
    setEditing({
      routeId: item.route_id,
      planningId: item.planning_id,
    });
    setEditData(item);
  };

  return (
    <>
      <Row>
        <div className="ppal-userView text-center text-white mt-3">
          <h2 className="mb-0 py-2">PLANNING</h2>
        </div>
      </Row>
      <Container fluid="xl" className="akkurat-font">
        <div className="btns-planning d-flex position-relative my-4 align-items-center justify-content-center flex-column flex-md-column ">
          <Button
            className="btn-volver-panel position-absolute start-0"
            onClick={() => navigate("/admin")}
          >
            Volver al panel
          </Button>
          <div>
            <Button
              className="btn-add-planning  ms-5 ms-md-5 ms-custom-AP"
              onClick={() => setShowModal(true)}
              aria-label="Añadir Nuevo Planning"
            >
              Añadir Planning
            </Button>
            <Button
              className="btn-verHistorial ms-4"
              onClick={() => setViewhistorical(!viewhistorical)}
              aria-label="ver historial"
            >
              {!viewhistorical ? "Ver historial" : "Ver Actual"}
            </Button>
          </div>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Fecha de salida </th>
              <th>Hora de salida </th>
              <th>Ciudad de salida</th>
              <th>Provincia de salida</th>
              <th>Ciudad de llegada</th>
              <th>Provincia de llegada</th>
              <th>{viewhistorical ? "Cancelado" : "Acciones"}</th>
            </tr>
          </thead>
          <tbody>
            {planningList &&
              planningList.map((item) => {
                return (
                  <tr key={`${item.route_id}-${item.planning_id}`}>
                    <td>
                      {editing.routeId === item.route_id &&
                      editing.planningId === item.planning_id ? (
                        <Form.Group controlId="formDepartureDate">
                          <Form.Control
                            type="date"
                            name="departure_date"
                            value={
                              editData.departure_date ||
                              format(item.departure_date, "dd-MM-yyyy")
                            }
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      ) : (
                        format(item.departure_date, "dd-MM-yyyy")
                      )}
                    </td>
                    <td>
                      {editing.routeId === item.route_id &&
                      editing.planningId === item.planning_id ? (
                        <Form.Group controlId="formDepartureTime">
                          <Form.Control
                            type="time"
                            name="departure_time"
                            value={
                              editData.departure_time || item.departure_time
                            }
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      ) : (
                        item.departure_time
                      )}
                    </td>
                    <td>{item.departure_city}</td>
                    <td>{item.departure_province}</td>
                    <td>{item.arrival_city}</td>
                    <td>{item.arrival_province}</td>
                    {!viewhistorical ? <td>
                        <div className="d-flex flex-column flex-md-row justify-content-around gap-2">
                          {editing.routeId === item.route_id &&
                          editing.planningId === item.planning_id ? (
                            <Button
                              style={{
                                backgroundColor: "var(--tranbolico-verde)",
                                color: "black",
                                border: "none",
                              }}
                              onClick={() =>
                                handleEditPlanning(
                                  item.route_id,
                                  item.planning_id
                                )
                              }
                            >
                              Guardar
                            </Button>
                          ) : (
                            <Button
                              style={{
                                backgroundColor: "var(--tranbolico-azulClaro)",
                                color: "black",
                                border: "none",
                              }}
                              onClick={() => onEdit(item)}
                            >
                              Editar
                            </Button>
                          )}
                          <Button
                            style={{
                              backgroundColor: "var(--tranbolico-rosa)",
                              color: "black",
                              border: "none",
                            }}
                            onClick={() =>
                              handleDeletePlanning(
                                item.route_id,
                                item.planning_id
                              )
                            }
                            aria-label={`Eliminar planning ${item.route_id}-${item.planning_id}`}
                          >
                            Eliminar
                          </Button>
                        </div>
                    </td> : <td>{item.is_deleted ? "CANCELADO" : ""}</td>}
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <AddNewPlanningModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onSave={handleSavePlanning}
        />
      </Container>
    </>
  );
};
