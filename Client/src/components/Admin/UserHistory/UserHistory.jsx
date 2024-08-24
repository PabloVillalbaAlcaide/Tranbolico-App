import { useState, useEffect, useContext } from "react";
import { Alert, Table } from "react-bootstrap";
import axios from "axios";
import { AppContext } from "../../../context/TranbolicoContextProvider";

export const UserHistory = ({ user_id }) => {
  const [reservationHistory, setReservationHistory] = useState([]);
  const [error, setError] = useState(null);
  const { globalState } = useContext(AppContext);

  useEffect(() => {
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

    viewHistory();
  }, [user_id, globalState.token]);

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {reservationHistory.length > 0 ? (
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
            {reservationHistory.map((reservation) => (
              <tr
                key={reservation.reservation_id}
                style={{
                  backgroundColor: reservation.is_deleted === 1 ? 'var(--tranbolico-rosa)' : 'transparent',
                }}
              >
                <td>{`${reservation.departure_city_ida} - ${reservation.departure_province_ida}`}</td>
                <td>{`${reservation.arrival_city_ida} - ${reservation.arrival_province_ida}`}</td>
                <td>{`${reservation.departure_days_ida} - ${reservation.departure_times_ida}`}</td>
                <td>{`${reservation.departure_days_vuelta} - ${reservation.departure_times_vuelta}`}</td>
                <td>{reservation.is_deleted === 1 ? 'Cancelado' : '12€'}</td>
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
