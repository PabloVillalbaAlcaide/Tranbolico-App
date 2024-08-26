import { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { AppContext } from "../../../context/TranbolicoContextProvider";

export const UserHistory = ({ user_id, fetchData }) => {
  const [reservationHistory, setReservationHistory] = useState([]);
  const { globalState } = useContext(AppContext);

  useEffect(() => {
    if (fetchData) {
      viewHistory();
    }
  }, [fetchData, user_id, globalState.token]);

  const viewHistory = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/reservation/historical?userid=${user_id}`,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );
      setReservationHistory(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("historial",reservationHistory);
  
  return (
    <>
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
