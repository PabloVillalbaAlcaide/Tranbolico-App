import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./searchBar.scss";
import { AppContext } from "../../context/TranbolicoContextProvider";

export const SearchBar = () => {
  const [origin, setOrigin] = useState("");
  const { globalState } = useContext(AppContext);
  const [originFinal, setOriginFinal] = useState({});
  const [destination, setDestination] = useState("");
  const [destinationFinal, setDestinationFinal] = useState({});
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [errMsg, setErrMsg] = useState({ show: false, text: "" });

  const navigate = useNavigate();

  const handleOriginChange = async (e) => {
    let { value } = e.target;
    setOrigin(value);

    value = value.trimStart();

    if (value !== "") {
      try {
        const res = await axios.get(
          `http://localhost:4000/reservation/oneWayTrip?search=${value}`
        );
        setOriginSuggestions(res.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setOriginSuggestions([]);
    }
  };

  const handleDestinationChange = async (e) => {
    const { value } = e.target;
    setDestination(value);

    if (value !== "" && originFinal.city && originFinal.province) {
      try {
        const res = await axios.get(
          `http://localhost:4000/reservation/returnTrip?search=${value}&city=${originFinal.city}&province=${originFinal.province}`
        );

        setDestinationSuggestions(res.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setDestinationSuggestions([]);
    }
  };

  const handleSelected = (city, province, set, setFinal, setSuggestion) => {
    setFinal({ city, province });
    set(`${city}, ${province}`);
    setSuggestion([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!originFinal.city || !destinationFinal.city) {
      setErrMsg({ show: true, text: "Por favor, seleccione ciudades válidas" });
    } else {
      setErrMsg({ show: false, text: "" });
      try {
        globalState.user
          ? navigate("/reservations", {
              state: { origin: originFinal, destination: destinationFinal },
            })
          : navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="contenedor-searchbar">
      <Form>
        <Form.Group
          className="mb-3 form-origen-destino_SB d-flex flex-column justify-content-center align-items-center"
          controlId="formBasicOrigin"
        >
          <Form.Label>Origen</Form.Label>
          <Form.Control
            type="text"
            placeholder="estoy en...."
            onChange={handleOriginChange}
            value={origin || ""}
            name="origin"
            className="form-99-buscador d-flex text-center"
            autoComplete="off"
          />
          {originSuggestions.length > 0 && (
            <div className="suggestions">
              {originSuggestions.map((e, index) => {
                const key = `${e.province_id || index}-${e.city_id || index}`;
                return (
                  <div
                    key={key}
                    onClick={() =>
                      handleSelected(
                        e.city_name,
                        e.name,
                        setOrigin,
                        setOriginFinal,
                        setOriginSuggestions
                      )
                    }
                  >
                    <p>
                      {e.city_name}, {e.name}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </Form.Group>
        <Form.Group
          className="mb-3 form-origen-destino_SB d-flex flex-column justify-content-center align-items-center"
          controlId="formBasicDestination"
        >
          <Form.Label>Destino</Form.Label>
          <Form.Control
            type="text"
            placeholder="voy a.."
            onChange={handleDestinationChange}
            value={destination || ""}
            name="destination"
            className="form-99-buscador d-flex text-center"
            autoComplete="off"
          />
          {destinationSuggestions.length > 0 && (
            <div className="suggestions">
              {destinationSuggestions.map((e, index) => {
                const key = `${e.province_id || index}-${e.city_id || index}`;
                return (
                  <div
                    key={key}
                    onClick={() =>
                      handleSelected(
                        e.city_name,
                        e.name,
                        setDestination,
                        setDestinationFinal,
                        setDestinationSuggestions
                      )
                    }
                  >
                    <p>
                      {e.city_name}, {e.name}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </Form.Group>
        {errMsg.show && (
          <p className="msg-error-home text-danger fw-bold mb-3">
            {errMsg.text}
          </p>
        )}
        <Button className="btn-buscarSBH" onClick={onSubmit}>
          Buscar
        </Button>
      </Form>
    </div>
  );
};
