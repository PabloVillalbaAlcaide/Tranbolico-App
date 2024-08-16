import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AppContext } from "../../context/TranbolicoContextProvider";
import axios from "axios";
import {Row, Table} from 'react-bootstrap'

export const UserReservations = () => {
  const [reservationsList, setReservationsList] = useState([]);
  const { hist } = useOutletContext();
  const { globalState } = useContext(AppContext);
  console.log(globalState);

  useEffect(() => {
    geteservations(hist);
  }, []);

  const geteservations = async (partialUrl) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/reservation/${partialUrl}/${globalState.user.user_id}`,
        { headers: { Authorization: `Bearer ${globalState.token}` } }
      );

      console.log(res.data);

      setReservationsList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </Row>
  );
};
