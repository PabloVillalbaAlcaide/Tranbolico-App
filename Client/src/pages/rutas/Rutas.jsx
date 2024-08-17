import { useState } from "react";
import { Row, Col} from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Rutas.scss";

export const Rutas = () => {
  const [origin, setOrigin] = useState("");
  const [originFinal, setOriginFinal] = useState({});
  const [destination, setDestination] = useState("");
  const [destinationFinal, setDestinationFinal] = useState({});
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [errMsg, setErrMsg] = useState({ show: false, text: "" });
  const navigate = useNavigate();
  console.log(origin);
  console.log(destinationSuggestions[1]);
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
  // const handleOriginSelected = (city, province) => {
  //   setOriginFinal({ city, province });
  //   setOrigin(`${city}, ${province}`);
  //   setOriginSuggestions([]);
  // };
  // const handleDestinationSelected = (city, province) => {
  //   setDestinationFinal({ city, province });
  //   setDestination(`${city}, ${province}`);
  //   setDestinationSuggestions([]);
  // };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (originFinal.city && originFinal.province) {
      try {
        const res = await axios.get(
          `http://localhost:4000/reservation/returnTrip?search=${""}&city=${
            originFinal.city
          }&province=${originFinal.province}`
        );
        setDestinationSuggestions(res.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setDestinationSuggestions([]);
    }
    // if (!originFinal.city || !destinationFinal.city) {
    //   setErrMsg({ show: true, text: "Por favor, seleccione ciudades válidas" });
    // } else {
    //   setErrMsg({ show: false, text: "" });
    //   try {
    //     navigate("/reservations", {
    //       state: { origin: originFinal, destination: destinationFinal },
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  };
  const onSubmit2 = () => {
    navigate("/reservations", {
      state: { origin: originFinal, destination: destinationFinal },
    });
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
            <Form.Group className="mb-3" controlId="formBasicOrigin">
              <Form.Label>Origen</Form.Label>
              <Form.Control
                type="text"
                placeholder="origen"
                onChange={handleOriginChange}
                value={origin || ""}
                name="origin"
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
            {/* <Form.Group className="mb-3" controlId="formBasicDestination">
              <Form.Label>Destino</Form.Label>
              <Form.Control
                type="text"
                placeholder="destino"
                onChange={handleDestinationChange}
                value={destination || ""}
                name="destination"
              />
              {destinationSuggestions.length > 0 && (
                <div className="suggestions b">
                  {destinationSuggestions.map((e, index) => {
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
            </Form.Group> */}
            {errMsg.show && (
              <p className="text-danger fw-bold mb-3">{errMsg.text}</p>
            )}
          </Form>
          <Button className="btn-iniciar-login" onClick={onSubmit}>
            Buscar
          </Button>
          {destinationSuggestions.length > 0 && (
            <Row className="contenedor-mapeo-rutas d-flex flex-row align-items-center justify-content-center gap-5 w-100 p-0 mt-4">
              {destinationSuggestions.map((e, index) => {
                const key = `${e.province_id || index}-${e.city_id || index}`;
                return (
                  <>
                  <Col xs={12} md={6} lg={4} className="card-ruta-info">
                    <p>
                      {originFinal.city} -
                      {/* {originFinal.province} */}
                    </p>
                    <p>
                      {e.city_name}
                      {/* {e.name} */}
                    </p>
                    <Button onClick={onSubmit2} className="btn-reservar_rutas mt-2">Reservar</Button>
                  </Col>
                  </>
                );
              })}
            </Row>
          )}
        </div>
        <br />
      </div>
    </>
  );
};
