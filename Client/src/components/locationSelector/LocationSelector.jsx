import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Form, FormControl, ListGroup, Row, Col } from "react-bootstrap";
import debounce from "lodash.debounce";
import "./locationSelector.scss";


export const SearchDropdown = ({
  type,
  selectedOption,
  handleSelect,
  placeholder,
  provinceId
}) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState(selectedOption);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (selectedOption) {
      setInputValue(
        selectedOption.name || selectedOption.city_name || selectedOption
      );
    }
  }, [selectedOption]);

  const fetchOptions = async (query) => {
    try {

      console.log(provinceId);
      

      const partialUrl = type === "province" ? `${type}?query=${query}` : `${type}?query=${query}&province=${provinceId}`

      const response = await axios.get(
        `http://localhost:4000/${partialUrl}`
      );
      setOptions(response.data);
      setShowDropdown(true);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    fetchOptions(inputValue);
  };

  const handleOptionSelect = (option) => {
    console.log("OPCION", option);
    const displayValue = option.name || option.city_name;
    setInputValue(displayValue);
    handleSelect(option);
    setShowDropdown(false); // Cierra el dropdown
  };

  return (
    <Form.Group
      controlId={`form${type.charAt(0).toUpperCase() + type.slice(1)}`}
    >
       <FormControl
        className="input-form"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={() => setShowDropdown(true)}
        autoComplete="off"
      />
      {inputValue && showDropdown && options.length > 0 && (
        <ListGroup className="dropdown-list">
          <Row>
            {options.map((option) => (
              <Col
                xs={12}
                key={
                  option.province_id +
                  (option.city_id ? `_${option.city_id}` : "")
                }
              >
                <ListGroup.Item
                  className="dropdown-item"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.name || option.city_name}
                </ListGroup.Item>
              </Col>
            ))}
          </Row>
        </ListGroup>
      )}
    </Form.Group>
  );
};
