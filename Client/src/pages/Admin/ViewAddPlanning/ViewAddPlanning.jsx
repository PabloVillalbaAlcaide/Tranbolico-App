import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/TranbolicoContextProvider";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import AddNewPlanningModal from "../AddNewPlanningModal/AddNewPlanningModal"; // Ajusta la ruta correcta

const ViewAddPlanning = () => {
  const { globalState, loading } = useContext(AppContext);
  const [planningList, setPlanningList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (globalState.token && !loading) {
      getPlanning();
    }
  }, [globalState.token, loading]);

  const getPlanning = async () => {
    try {
      const res = await axios.get("http://localhost:4000/admin/getPlanning", {
        headers: { Authorization: `Bearer ${globalState.token}` },
      });
      setPlanningList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSavePlanning = (newPlanning) => {
    // Aquí puedes manejar la lógica para guardar el nuevo planning
    console.log("Nuevo planning:", newPlanning);
    // Actualiza la lista de plannings si es necesario
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Añadir Nuevo Planning
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Departure Date</th>
            <th>Departure Time</th>
            <th>Departure City</th>
            <th>Departure Province</th>
            <th>Arrival City</th>
            <th>Arrival Province</th>
          </tr>
        </thead>
        <tbody>
          {planningList &&
            planningList.map((item) => (
              <tr key={`${item.route_id}-${item.planning_id}`}>
                <td>{item.departure_date}</td>
                <td>{item.departure_time}</td>
                <td>{item.departure_city}</td>
                <td>{item.departure_province}</td>
                <td>{item.arrival_city}</td>
                <td>{item.arrival_province}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      <AddNewPlanningModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSavePlanning}
      />
    </div>
  );
};

export default ViewAddPlanning;
