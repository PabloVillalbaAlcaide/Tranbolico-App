import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../../context/TranbolicoContextProvider";
import { Table, Form, Button } from "react-bootstrap";
import { AutocompleteInput } from "../../../components/Admin/AutoCompleteInput/AutoCompleteInput";
import { AddRouteModal } from "../../../components/Admin/Modal/AddRouteModal";
import "./viewEditRoute.scss";
import "../../../App.css";
import { useNavigate } from "react-router-dom";

export const ViewEditRoute = () => {
  const navigate = useNavigate();
  const { globalState, loading } = useContext(AppContext);
  const [routes, setRoutes] = useState([]);
  const [editRouteId, setEditRouteId] = useState("");
  const [editedRoute, setEditedRoute] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newRoute, setNewRoute] = useState({
    departure_city: "",
    departure_city_id: "",
    departure_province: "",
    departure_province_id: "",
    arrival_city: "",
    arrival_city_id: "",
    arrival_province: "",
    arrival_province_id: "",
    text: "",
    departure_city_province: "",
    arrival_city_province: "",
  });
  const [updateRoutes, setUpdateRoutes] = useState(false);

  useEffect(() => {
    if (globalState.token && !loading) {
      getRoutes();
    }
  }, [globalState.token, loading, updateRoutes]);

  const getRoutes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/admin/getRoutes", {
        headers: { Authorization: `Bearer ${globalState.token}` },
      });
      setRoutes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = (route) => {
    setEditRouteId(route.route_id);
    setEditedRoute({
      ...route,
      departure_city_province: `${route.departure_city} - ${route.departure_province}`,
      arrival_city_province: `${route.arrival_city} - ${route.arrival_province}`,
    });
  };

  const handleInputChange = (name, value) => {
    console.log("Nombre", name, "Valor", value);
    setEditedRoute((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    console.log(editedRoute);

    try {
      console.log(editedRoute);

      const response = await axios.put(
        "http://localhost:4000/admin/editRoute",
        editedRoute,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );
      if (response.status === 200) {
        setRoutes(
          routes.map((route) =>
            route.route_id === editRouteId ? editedRoute : route
          )
        );
      }
      setEditRouteId("");
    } catch (err) {
      console.log(err);
      alert("Error al guardar la ruta. Por favor, inténtalo de nuevo.");
    }
    console.log("realizado");
  };

  const handleDisableClick = async (routeId, isDisabled) => {
    console.log("LLEGO");
    
    try {
      const response = await axios.patch(
        "http://localhost:4000/admin/disableRoute",
        { route_id: routeId, is_disabled: isDisabled },
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );
      console.log("LLEGO 2");
      
      if (response.status === 200) {
        setRoutes(
          routes.map((route) =>
            route.route_id === routeId
              ? { ...route, is_disabled: isDisabled }
              : route
          )
        );
      }
    } catch (err) {
      console.log(err);
      alert("Error al actualizar la ruta. Por favor, inténtalo de nuevo.");
    }
  };

  const handleDeleteClick = async (routeId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/admin/deleteRoute/${routeId}`,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );
      if (response.status === 200) {
        setRoutes(routes.filter((route) => route.route_id !== routeId));
      }
    } catch (err) {
      console.log(err);
      alert("Error al eliminar la ruta. Por favor, inténtalo de nuevo.");
    }
  };

  const handleNewRouteChange = (name, value) => {
    setNewRoute((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddRoute = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/admin/addRoute",
        newRoute,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );

      if (response.status === 200) {
        const addedRoute = response.data;
        setRoutes((prevRoutes) => [...prevRoutes, addedRoute]);
        setShowModal(false);
        setUpdateRoutes(!updateRoutes);
      }
    } catch (err) {
      console.log(err);
      alert("Error al añadir la ruta. Por favor, inténtalo de nuevo.");
    }
    finally{setNewRoute({})}
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center my-4 gap-2">
        <Button className="btn-add-route" onClick={() => setShowModal(true)}>
          Añadir Nueva Ruta
        </Button> 
        <Button className="btn-volver-panel"  onClick={()=> navigate("/admin")}>Volver al panel</Button>
      </div>
      {routes.length > 0 ? (          
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Origen</th>
                  <th>Destino</th>
                  <th>Comentarios</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route) => (
                  <tr key={route.route_id}>
                    <td>
                      <Form.Group controlId={`origin-${route.route_id}`}>
                        <AutocompleteInput
                          value={
                            editRouteId === route.route_id
                              ? editedRoute.departure_city_province
                              : `${route.departure_city} - ${route.departure_province}`
                          }
                          onChange={(value) =>
                            handleInputChange("departure_city_province", value)
                          }
                          onSelect={(suggestion) => {
                            handleInputChange(
                              "departure_city",
                              suggestion.city_name
                            );
                            handleInputChange(
                              "departure_city_id",
                              suggestion.city_id
                            );
                            handleInputChange(
                              "departure_province",
                              suggestion.name
                            );
                            handleInputChange(
                              "departure_province_id",
                              suggestion.province_id
                            );
                            handleInputChange(
                              "departure_city_province",
                              suggestion.city_province
                            );
                          }}
                          disabled={editRouteId !== route.route_id}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group controlId={`destination-${route.route_id}`}>
                        <AutocompleteInput
                          value={
                            editRouteId === route.route_id
                              ? editedRoute.arrival_city_province
                              : `${route.arrival_city} - ${route.arrival_province}`
                          }
                          onChange={(value) =>
                            handleInputChange("arrival_city_province", value)
                          }
                          onSelect={(suggestion) => {
                            handleInputChange("arrival_city", suggestion.city_name);
                            handleInputChange(
                              "arrival_city_id",
                              suggestion.city_id
                            );
                            handleInputChange("arrival_province", suggestion.name);
                            handleInputChange(
                              "arrival_province_id",
                              suggestion.province_id
                            );
                          }}
                          disabled={editRouteId !== route.route_id}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group controlId={`comments-${route.route_id}`}>
                        <Form.Control
                          type="text"
                          name="text"
                          value={
                            editRouteId === route.route_id
                              ? (editedRoute.text !== null ? editedRoute.text : "")
                              : (route.text !== null ? route.text : "")
                          }
                          onChange={(e) =>
                            handleInputChange("text", e.target.value)
                          }
                          disabled={editRouteId !== route.route_id}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      {editRouteId === route.route_id ? (
                        <Button variant="success" onClick={handleSaveClick}>
                          Guardar
                        </Button>
                      ) : (
                        <>
                          <div className="d-flex flex-column flex-md-row justify-content-around gap-2">
                            <Button
                              variant="info"
                              onClick={() => handleEditClick(route)}
                            >
                              Editar
                            </Button>
                            <Button
                              variant="warning"
                              onClick={() =>
                                handleDisableClick(
                                  route.route_id,
                                  !route.is_disabled
                                )
                              }
                            >
                              {route.is_disabled ? "Habilitar" : "Deshabilitar"}
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handleDeleteClick(route.route_id)}
                            >
                              Eliminar
                            </Button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          
      ) : (
        <p>No hay rutas disponibles</p>
      )}

      <AddRouteModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setNewRoute({});
        }}
        handleNewRouteChange={handleNewRouteChange}
        handleAddRoute={handleAddRoute}
        newRoute={newRoute}
      />
    </>
  );
};
