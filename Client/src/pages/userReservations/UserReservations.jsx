import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AppContext } from "../../context/TranbolicoContextProvider";
import axios from "axios";
import { Table } from "react-bootstrap";
import { ModalApp } from "../../components/modal/Modal";

const iconoCancelar = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-x-square-fill"
    viewBox="0 0 16 16"
  >
    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
  </svg>
);

export const UserReservations = () => {
  const [reservationsList, setReservationsList] = useState([]);
  const { hist } = useOutletContext();
  const { globalState, loading } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (!loading && globalState.user) {
      getReservations(hist);
    }
  }, [globalState.user, loading, hist]);

  const getReservations = async (partialUrl) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/reservation/${partialUrl}/${globalState.user.user_id}`,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );

      setReservationsList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShow = (elem) => {
    setShow(!show);
    setElement(elem);
  };

  const cancelReservation = async (reservation) => {
    try {
      await axios.put(
        `http://localhost:4000/reservation/cancelReservation`,
        {
          reservationForCancel: reservation,
        },
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );
      setShow(!show);
    } catch (err) {
      setShow(!show);
      console.log(err);
    }
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead className="text-center">
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Complementos</th>
            <th>Precio</th>
            {hist === "nextReservations" && <th>Cancelar</th>}
          </tr>
        </thead>
        <tbody>
          {reservationsList.map((elem, index) => (
            <tr key={index}>
              <td>{elem.departure_day}</td>
              <td>{elem.departure_time}</td>
              <td>
                {elem.departure_city_name} - {elem.departure_province_name}
              </td>
              <td>
                {elem.arrival_city_name} - {elem.arrival_province_name}
              </td>
              <td>Guía Turístico</td>
              <td>12€</td>
              {hist === "nextReservations" && elem.reservation_type === 1 && (
                <td onClick={() => handleShow(elem)}>{iconoCancelar}</td>
              )}
              {hist === "historical" && elem.is_deleted === 1 && (
                <td style={{backgroundColor:"#e72958bf", color:"white"}}>Cancelada</td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalApp
        element={element}
        title={`${element?.departure_city_name} - ${element?.arrival_city_name}`}
        text={"¿Deseas eliminar la ruta seleccionada?"}
        aceptar={cancelReservation}
        show={show}
        handleShow={handleShow}
      />
    </>
  );
};
