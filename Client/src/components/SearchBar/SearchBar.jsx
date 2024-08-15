import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./searchBar.scss";

export const SearchBar = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const navigate = useNavigate();

  const handleOriginChange = async (e) => {
    let { value } = e.target;
    setOrigin(value);
    if (value[0] === " ") {
      value = value.split(" ")[0];
    }

    if (value != "" && value != " ") {
      try {
        const res = await axios.get(
          `http://localhost:4000/reservation/search?name="${value}"`,
          { params: { search: value } }
        );
        setOriginSuggestions(res.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setOriginSuggestions([]);
    }
  };

  console.log(origin);

  const handleDestinationChange = async (e) => {
    const { value } = e.target;
    setDestination(value);
    if (value != "" && value != " " && origin) {
      try {
        const res = await axios.get(
          `http://localhost:4000/reservation/search?name="${value}"`,
          { params: { search: value } }
        );
        setDestinationSuggestions(res.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setDestinationSuggestions([]);
    }
  };
  console.log(destination);

  const handleOriginSelected = (city) => {
    setOrigin(city);
    setOriginSuggestions([]);
  };

  const handleDestinationSelected = (city) => {
    setDestination(city);
    setDestinationSuggestions([]);
  };

  const onSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:4000/reservation", {
        origin,
        destination,
      });
      if (response.status === 200) {
        navigate("/reservations", { state: { origin, destination } });
      } else {
        console.log("error al enviar los datos");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
            {originSuggestions.map((e) => {
              <div
                key={`${e.province_id}-${e.city_id}`}
                onClick={() => handleOriginSelected(`${e.name}-${e.city_name}`)}
              >
                {e.name}, {e.city_name}
              </div>;
            })}
          </div>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDestination">
        <Form.Label>Destino</Form.Label>
        <Form.Control
          type="text"
          placeholder="destino"
          onChange={handleDestinationChange}
          value={destination || ""}
          name="destination"
        />
        {destinationSuggestions.length > 0 && (
          <div className="suggestions">
            {destinationSuggestions.map((e) => {
              <div
                key={`${e.province_id}-${e.city_id}`}
                onClick={() =>
                  handleDestinationSelected(`${e.name}-${e.city_name}`)
                }
              >
                {e.name}, {e.city_name}
              </div>;
            })}
          </div>
        )}
      </Form.Group>
      <Button variant="primary" onClick={onSubmit}>
        Buscar
      </Button>
    </Form>
  );
};
