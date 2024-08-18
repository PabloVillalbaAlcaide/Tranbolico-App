import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { AppContext } from "../../context/TranbolicoContextProvider";

export const DetailReservation = () => {
  const { reservation } = useOutletContext();
  const navigate = useNavigate();
  const { globalState } = useContext(AppContext);

  const confirmReservation = async () => {
    try {
      await axios.post(`http://localhost:4000/reservation/setReservation`, reservation,{
        headers: { Authorization: `Bearer ${globalState.token}` },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <Button onClick={confirmReservation}>Confirmar</Button>
        <Button onClick={() => navigate(-1)}>Atras</Button>
        <Button onClick={() => navigate("/")}>Cancelar</Button>
      </div>
    </>
  );
};
