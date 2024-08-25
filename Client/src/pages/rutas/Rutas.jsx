import { useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Rutas.scss";
import { AppContext } from "../../context/TranbolicoContextProvider";
import { ButtonTram } from "../../components/ButtonTram/ButtonTram";

export const Rutas = () => {
  const { globalState } = useContext(AppContext);
  const [origin, setOrigin] = useState("");
  const [originFinal, setOriginFinal] = useState({});
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [noRoutesMessage, setNoRoutesMessage] = useState("");
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

  const handleSelected = (city, province, set, setFinal, setSuggestion) => {
    setFinal({ city, province });
    set(`${city}, ${province}`);
    setSuggestion([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (originFinal.city && originFinal.province) {
      setNoRoutesMessage("");
      try {
        const res = await axios.get(
          `http://localhost:4000/reservation/returnTrip?search=${""}&city=${
            originFinal.city
          }&province=${originFinal.province}`
        );
        setDestinationSuggestions(res.data);
        if (res.data.length === 0) {
          setNoRoutesMessage("No hay rutas disponibles.");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setDestinationSuggestions([]);
    }
  };

  const onSubmit2 = (elem) => {
    elem = { city: elem.city_name, province: elem.name };
    globalState.user
      ? navigate("/reservations", {
          state: { origin: originFinal, destination: elem },
        })
      : navigate("/login");
  };

  return (
    <>
      <div className="contenedor-rutas ">
        <Row>
          <div className="ppal-rutas text-center text-white mt-2">
            <h2 className="mb-0 py-2">RUTAS</h2>
          </div>
        </Row>
        <br />
        <div className="contenedor-form-rutas d-flex justify-content-center align-items-center flex-column">
          <Form>
            <Form.Group
              className="mb-3 text-center"
              controlId="formBasicOrigin"
            >
              <Form.Label className="fs-4">Origen</Form.Label>
              <Form.Control
                type="text"
                placeholder="estoy en.."
                onChange={handleOriginChange}
                value={origin || ""}
                name="origin"
                autoComplete="off"
                className="text-center"
              />
              {originSuggestions.length > 0 && (
                <div className="suggestions">
                  {originSuggestions.map((e, index) => {
                    const key = `${e.province_id || index}-${
                      e.city_id || index
                    }`;
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
          </Form>

          <ButtonTram 
          color="black" 
          onClick={onSubmit}>
            Buscar
          </ButtonTram>
          {noRoutesMessage && (
            <p style={{ color: "red", marginTop: "20px" }}>{noRoutesMessage}</p>
          )}
          {destinationSuggestions.length > 0 && (
            <Row className="contenedor-mapeo-rutas d-flex flex-row align-items-center justify-content-center gap-5 w-100 p-0 mt-4">
              {destinationSuggestions.map((e, index) => {
                const key = `${e.province_id || index}-${e.city_id || index}`;
                return (
                  <Col
                    xs={12}
                    md={6}
                    lg={4}
                    className="card-ruta-info"
                    key={key}
                  >
                    <p>{originFinal.city}</p>
                    <p>{e.city_name}</p>
                    <ButtonTram
                      padding = '10px 35px'
                      fontSize="1.5rem"
                      backgroundColor="var(--tranbolico-fucsia)"
                      onClick={() => onSubmit2(e)}
                    >
                      Reservar
                    </ButtonTram>
                  </Col>
                );
              })}
            </Row>
          )}
        </div>
        <br />
        <br /> <br />
      </div>
    </>
  );
};
