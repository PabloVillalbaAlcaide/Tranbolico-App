import "./userReservations.scss";
import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AppContext } from "../../context/TranbolicoContextProvider";
import axios from "axios";
import { Table } from "react-bootstrap";
import { ModalApp } from "../../components/modal/Modal";
import { format } from "date-fns";

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
  const formatFecha = (fecha) => format(new Date(fecha), "dd/MM/yyyy");

  useEffect(() => {
    if (!loading && globalState.user) {
      getReservations(hist);
    }
  }, [globalState.user, loading, hist]);

  const getReservations = async (partialUrl) => {
    if (partialUrl === "myReservations") {
      partialUrl = "nextReservations";
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/reservation/${partialUrl}/${
          globalState.user.user_id
        }`,
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
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/reservation/cancelReservation`,
        {
          reservationForCancel: reservation,
        },
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );
      if (response.status === 200) {
        setReservationsList(
          reservationsList.filter(
            (e) => e.reservation_id !== reservation.reservation_id
          )
        );
      }
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
            <th>Origen</th>
            <th>Destino</th>
            <th>Fecha de ida</th>
            <th>Fecha de vuelta</th>
            <th>Complementos</th>
            <th>Precio</th>
            {hist === "myReservations" && <th>Cancelar</th>}
          </tr>
        </thead>
        <tbody>
          {reservationsList.map((elem, index) => (
            <tr key={index}>
              <td>
                {elem.departure_city_ida}, {elem.departure_province_ida}
              </td>
              <td>
                {elem.arrival_province_ida}, {elem.arrival_city_ida}
              </td>
              <td>
                {formatFecha(elem.departure_days_ida)} /{" "}
                {elem.departure_times_ida}
              </td>
              <td>
                {formatFecha(elem.departure_days_vuelta)} /{" "}
                {elem.departure_times_vuelta}
              </td>
              <td>Guía Turístico</td>
              <td>12€</td>
              {hist === "myReservations" && (
                <td
                  onClick={() => handleShow(elem)}
                  className="btn-cancel-reservation"
                >
                  {iconoCancelar}
                </td>
              )}
              {hist === "historical" && elem.is_deleted === 1 && (
                <td style={{ backgroundColor: "#e72958bf", color: "white" }}>
                  Cancelada
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalApp
        element={element}
        title={`${element?.departure_city_ida} - ${element?.arrival_city_ida}`}
        text={"¿Deseas eliminar la ruta seleccionada?"}
        aceptar={cancelReservation}
        show={show}
        handleShow={handleShow}
      />
    </>
  );
};
