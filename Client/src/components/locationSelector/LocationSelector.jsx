import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Form, FormControl, ListGroup, Row, Col } from "react-bootstrap";
import debounce from 'lodash.debounce';
import './locationSelector.scss';

export const SearchDropdown = ({
  type,
  handleSelect,
  placeholder,
}) => {
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const fetchOptions = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/${type}?query=${query}`
      );
      const formattedOptions = response.data.map(option => ({
        id: option.province_id || option.city_id, // Ajusta según el formato de tus datos
        label: option.name || option.city_name // Ajusta según el formato de tus datos
      }));
      setOptions(formattedOptions);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    }
  };

  const debouncedFetchOptions = useCallback(
    debounce((query) => {
      fetchOptions(query);
    }, 300),
    [type]
  );

  useEffect(() => {
    if (inputValue) {
      debouncedFetchOptions(inputValue);
    }
  }, [inputValue, debouncedFetchOptions]);

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.label && option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [options, inputValue]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleOptionSelect = (option) => {
    setInputValue(option.label);
    handleSelect(option.id);
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
      />
      {inputValue && filteredOptions.length > 0 && (
        <ListGroup className="dropdown-list">
          <Row>
            {filteredOptions.map((option) => (
              <Col xs={12} key={option.id}>
                <ListGroup.Item 
                  className="dropdown-item" 
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.label}
                </ListGroup.Item>
              </Col>
            ))}
          </Row>
        </ListGroup>
      )}
    </Form.Group>
  );
};
