import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Form, ListGroup } from 'react-bootstrap';
import { AppContext } from '../../../context/TranbolicoContextProvider';

export const AutocompleteInput = ({ value, onChange, onSelect, disabled }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const {globalState} = useContext(AppContext)

  useEffect(() => {
    if (value.length > 2 && !disabled) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get('http://localhost:4000/admin/searchLocations', {
            params: { q: value },
            headers: { Authorization: `Bearer ${globalState.token}` }
          });
          setSuggestions(response.data);
          setShowSuggestions(true);
        } catch (err) {
          console.log(err);
        }
      };
      fetchSuggestions();
    } else {
      setShowSuggestions(false);
    }
  }, [value, disabled]);

  const handleSelect = (suggestion) => {
    onSelect(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div>
      <Form.Control
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        onFocus={() => value.length > 2 && !disabled && setShowSuggestions(true)}
        disabled={disabled}
      />
      {showSuggestions && (
        <ListGroup>
          {suggestions.map((suggestion, index) => (
            <ListGroup.Item key={index} onClick={() => handleSelect(suggestion)}>
              {suggestion.city_name} - {suggestion.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};
