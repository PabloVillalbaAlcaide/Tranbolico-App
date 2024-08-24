import { useState, useEffect, useContext } from "react";
import { Alert, Table } from "react-bootstrap";
import axios from "axios";
import { AppContext } from "../../../context/TranbolicoContextProvider";

export const UserReservations = ({ user_id }) => {
  const [reservation, setReservation] = useState([]);
  const [error, setError] = useState(null);
  const { globalState } = useContext(AppContext);

  useEffect(() => {
    const viewReservation = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/admin/reservationUser?userid=${user_id}`,
          {
            headers: { Authorization: `Bearer ${globalState.token}` },
          }
        );
        setReservation(res.data);
      } catch (error) {
        console.error(error);
        setError("Error al cargar el historial de reservas.");
      }
    };

    viewReservation();
  }, [user_id, globalState.token]);

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {reservation.length > 0 ? (
        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th>Origen</th>
              <th>Destino</th>
              <th>Viaje de ida</th>
              <th>Viaje de vuelta</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {reservation.map((item) => (
              <tr key={item.reservation_id}>
                <td>{`${item.departure_city_ida} - ${item.departure_province_ida}`}</td>
                <td>{`${item.arrival_city_ida} - ${item.arrival_province_ida}`}</td>
                <td>{`${item.departure_days_ida} - ${item.departure_times_ida}`}</td>
                <td>{`${item.departure_days_vuelta} - ${item.departure_times_vuelta}`}</td>
                <td>{item.is_deleted === 1 ? 'Cancelado' : '12€'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No hay reservas disponibles.</p>
      )}
    </>
  );
};
