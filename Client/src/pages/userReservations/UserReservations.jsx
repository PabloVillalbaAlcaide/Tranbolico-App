import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AppContext } from "../../context/TranbolicoContextProvider";
import axios from "axios";
import { Col, Row, Table } from 'react-bootstrap';

export const UserReservations = () => {
  const [reservationsList, setReservationsList] = useState([]);
  const { hist } = useOutletContext();
  const { globalState, loading } = useContext(AppContext);

  useEffect(() => {
    if (!loading && globalState.user) {
      getReservations(hist);
    }
  }, [globalState.user, loading, hist]);

  const getReservations = async (partialUrl) => {
    try {
      const url = `http://localhost:4000/reservation/${partialUrl}/${globalState.user.user_id}`;
      console.log(url);
      
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${globalState.token}` }
      });

      console.log(res.data);

      setReservationsList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Row>
      <Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Complementos</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {reservationsList.map((elem, index) => (
              <tr key={index}>
                <td>{elem.departure_day}</td>
                <td>{elem.departure_time}</td>
                <td>{elem.departure_city_name} - {elem.departure_province_name}</td>
                <td>{elem.arrival_city_name} - {elem.arrival_province_name}</td>
                <td>Guía Turístico</td>
                <td>12€</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};