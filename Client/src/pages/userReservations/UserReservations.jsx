import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AppContext } from "../../context/TranbolicoContextProvider";
import axios from "axios";

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

  return <div>UserReservations</div>;
};
