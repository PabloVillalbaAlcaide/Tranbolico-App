import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { AutocompleteInput } from "../AutoCompleteInput/AutoCompleteInput";

export const AddRouteModal = ({ show, handleClose, handleNewRouteChange, handleAddRoute, newRoute }) => {
  const [fullDeparture, setFullDeparture] = useState('');

  useEffect(() => {
    if (newRoute.departure_city && newRoute.departure_province) {
      setFullDeparture(`${newRoute.departure_city} - ${newRoute.departure_province}`);
    }
  }, [newRoute.departure_city, newRoute.departure_province]);

  const handleSelect = (field, suggestion) => {
    const fullValue = `${suggestion.city_name} - ${suggestion.name}`;
    handleNewRouteChange(field, fullValue);
    setFullDeparture(fullValue);
  };

  const handleInputChange = (field, value) => {
    handleNewRouteChange(field, value);
    if (field === 'departure_city' || field === 'departure_province') {
      setFullDeparture(`${newRoute.departure_city} - ${newRoute.departure_province}`);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir Nueva Ruta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="departureCity">
            <Form.Label>Ciudad de Salida</Form.Label>
            <AutocompleteInput
              value={fullDeparture}
              onChange={(value) => handleInputChange('departure_city', value)}
              onSelect={(suggestion) => handleSelect('departure_city', suggestion)}
            />
          </Form.Group>
          <Form.Group controlId="departureProvince">
            <Form.Label>Provincia de Salida</Form.Label>
            <AutocompleteInput
              value={newRoute.departure_province}
              onChange={(value) => handleInputChange('departure_province', value)}
              onSelect={(suggestion) => handleInputChange('departure_province', suggestion.name)}
            />
          </Form.Group>
          <Form.Group controlId="arrivalCity">
            <Form.Label>Ciudad de Llegada</Form.Label>
            <AutocompleteInput
              value={newRoute.arrival_city}
              onChange={(value) => handleNewRouteChange('arrival_city', value)}
              onSelect={(suggestion) => handleNewRouteChange('arrival_city', suggestion.city_name)}
            />
          </Form.Group>
          <Form.Group controlId="arrivalProvince">
            <Form.Label>Provincia de Llegada</Form.Label>
            <AutocompleteInput
              value={newRoute.arrival_province}
              onChange={(value) => handleNewRouteChange('arrival_province', value)}
              onSelect={(suggestion) => handleNewRouteChange('arrival_province', suggestion.name)}
            />
          </Form.Group>
          <Form.Group controlId="text">
            <Form.Label>Comentarios</Form.Label>
            <Form.Control
              type="text"
              name="text"
              value={newRoute.text}
              onChange={(e) => handleNewRouteChange('text', e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        <Button variant="primary" onClick={handleAddRoute}>Añadir Ruta</Button>
      </Modal.Footer>
    </Modal>
  );
};