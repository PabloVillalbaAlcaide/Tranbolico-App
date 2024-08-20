import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, FormControl, ListGroup } from 'react-bootstrap';

export const SearchDropdown = ({ type, selectedOption, handleSelect, placeholder }) => {
    const [options, setOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        // Define la URL de la API basada en el tipo
        const url = type === 'province' ? 'https://api.example.com/provinces' : 'https://api.example.com/cities';

        // Realiza la solicitud a la API cuando el componente se monta
        axios.get(url)
            .then(response => {
                setOptions(response.data);
            })
            .catch(error => {
                console.error(`Error fetching ${type}:`, error);
            });
    }, [type]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setFilteredOptions(options.filter(option => option.label.toLowerCase().includes(value.toLowerCase())));
    };

    const handleOptionSelect = (option) => {
        setInputValue(option.label);
        handleSelect(option.value);
    };

    return (
        <Form.Group controlId={`form${type.charAt(0).toUpperCase() + type.slice(1)}`}>
            <Form.Label>{placeholder}</Form.Label>
            <FormControl
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
            />
            {filteredOptions.length > 0 && (
                <ListGroup>
                    {filteredOptions.map(option => (
                        <ListGroup.Item key={option.id} onClick={() => handleOptionSelect(option)}>
                            {option.label}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Form.Group>
    );
};

