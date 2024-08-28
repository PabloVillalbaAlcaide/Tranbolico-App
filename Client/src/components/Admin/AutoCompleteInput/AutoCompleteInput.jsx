import './AutoCompleteInput.scss'
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { AppContext } from "../../../context/TranbolicoContextProvider";

export const AutocompleteInput = ({ value, onChange, onSelect, disabled }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { globalState } = useContext(AppContext);

  useEffect(() => {
    if (value?.length > 1 && !disabled) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/admin/searchLocations`,
            {
              params: { q: value },
              headers: { Authorization: `Bearer ${globalState.token}` },
            }
          );
          const suggestionsWithCityProvince = response.data.map(
            (suggestion) => ({
              ...suggestion,
              city_province: `${suggestion.city_name} - ${suggestion.name}`,
            })
          );
          setSuggestions(suggestionsWithCityProvince);
          setShowSuggestions(true);
        } catch (err) {
          console.log(err);
        }
      };
      fetchSuggestions();
    } else {
      setShowSuggestions(false);
    }
  }, [value, disabled, globalState.token]);

  const handleSelect = (suggestion) => {
    onSelect(suggestion);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (!disabled) {
      onChange("");
      setShowSuggestions(false);
    }
  };

  return (
    <div>
      <Form.Control
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        onFocus={handleFocus}
        disabled={disabled}
        autoComplete="off"
      />
      {showSuggestions && (
        <ListGroup>
          {suggestions.map((suggestion, index) => (
            <ListGroup.Item
              key={index}
              onMouseDown={() => handleSelect(suggestion)}
              className="add-cursor-pointer"
            >
              {suggestion.city_province}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};
