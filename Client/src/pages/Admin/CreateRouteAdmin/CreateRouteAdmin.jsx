import { useState } from "react";
import axios from "axios";

const initialRutas = [
  { id: 1, origen: "Madrid", destino: "Barcelona", precio: "50€" },
  { id: 2, origen: "Valencia", destino: "Sevilla", precio: "40€" },
  { id: 3, origen: "Bilbao", destino: "Zaragoza", precio: "30€" },
];

export const CreateRouteAdmin = () => {
  const [editableId, setEditableId] = useState(null);
  const [rutasState, setRutasState] = useState(initialRutas);
  const [newRuta, setNewRuta] = useState({
    origen: "",
    destino: "",
    precio: "",
  });
  const [addingNew, setAddingNew] = useState(false);

  const handleEditClick = (id) => {
    setEditableId(id);
  };

  const handleSaveClick = async (id) => {
    const rutaToUpdate = rutasState.find((ruta) => ruta.id === id);
    try {
      await axios.put(
        `http://localhost:4000/admin/actualizarRuta`,
        rutaToUpdate
      );
      setEditableId(null); // Exit edit mode after saving
    } catch (error) {
      console.error("Error updating ruta:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/admin/deleteRuta/${id}`);
      setRutasState((prevRutas) => prevRutas.filter((ruta) => ruta.id !== id));
    } catch (error) {
      console.error("Error deleting ruta:", error);
    }
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setRutasState((prevRutas) =>
      prevRutas.map((ruta) =>
        ruta.id === id ? { ...ruta, [name]: value } : ruta
      )
    );
  };

  const handleNewRutaChange = (e) => {
    const { name, value } = e.target;
    setNewRuta((prevRuta) => ({ ...prevRuta, [name]: value }));
  };

  const handleAddNewClick = () => {
    setAddingNew(true);
  };

  const handleCancelNewClick = () => {
    setAddingNew(false);
    setNewRuta({ origen: "", destino: "", precio: "" });
  };

  const handleAcceptNewClick = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/admin/nuevaRuta`,
        newRuta
      );
      setRutasState((prevRutas) => [
        ...prevRutas,
        { ...newRuta, id: response.data.id },
      ]);
      setAddingNew(false);
      setNewRuta({ origen: "", destino: "", precio: "" });
    } catch (error) {
      console.error("Error adding new ruta:", error);
    }
  };

  return (
    <div>
      <button onClick={handleAddNewClick} className="btn btn-success mb-3">
        Añadir Ruta
      </button>

      {addingNew && (
        <div className="ruta-item mb-3">
          <input
            type="text"
            name="origen"
            value={newRuta.origen}
            onChange={handleNewRutaChange}
            className="form-control"
            placeholder="Origen"
          />
          <input
            type="text"
            name="destino"
            value={newRuta.destino}
            onChange={handleNewRutaChange}
            className="form-control"
            placeholder="Destino"
          />
          <input
            type="text"
            name="precio"
            value={newRuta.precio}
            onChange={handleNewRutaChange}
            className="form-control"
            placeholder="Precio"
          />
          <button onClick={handleAcceptNewClick} className="btn btn-primary">
            Aceptar
          </button>
          <button onClick={handleCancelNewClick} className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      )}

      {rutasState.map((ruta) => (
        <div key={ruta.id} className="ruta-item mb-3">
          <input
            type="text"
            name="origen"
            value={ruta.origen}
            disabled={editableId !== ruta.id}
            onChange={(e) => handleChange(e, ruta.id)}
            className="form-control"
          />
          <input
            type="text"
            name="destino"
            value={ruta.destino}
            disabled={editableId !== ruta.id}
            onChange={(e) => handleChange(e, ruta.id)}
            className="form-control"
          />
          <input
            type="text"
            name="precio"
            value={ruta.precio}
            disabled={editableId !== ruta.id}
            onChange={(e) => handleChange(e, ruta.id)}
            className="form-control"
          />
          {editableId === ruta.id ? (
            <button
              onClick={() => handleSaveClick(ruta.id)}
              className="btn btn-success"
            >
              Guardar
            </button>
          ) : (
            <button
              onClick={() => handleEditClick(ruta.id)}
              className="btn btn-primary"
            >
              Editar
            </button>
          )}
          <button
            onClick={() => handleDeleteClick(ruta.id)}
            className="btn btn-danger"
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};
