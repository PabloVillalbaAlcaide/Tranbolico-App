import { Modal, Button, Form } from "react-bootstrap";
import { AutocompleteInput } from "../../../components/Admin/AutoCompleteInput/AutoCompleteInput";

export const AddRouteModal = ({
  show,
  handleClose,
  handleAddRoute,
  handleNewRouteChange,
  newRoute,
}) => {
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
              value={newRoute.departure_city_province}
              onChange={(value) =>
                handleNewRouteChange("departure_city_province", value)
              }
              onSelect={(suggestion) => {
                handleNewRouteChange("departure_city", suggestion.city_name);
                handleNewRouteChange("departure_city_id", suggestion.city_id);
                handleNewRouteChange("departure_province", suggestion.name);
                handleNewRouteChange(
                  "departure_province_id",
                  suggestion.province_id
                );
                handleNewRouteChange(
                  "departure_city_province",
                  suggestion.city_province
                );
              }}
            />
          </Form.Group>
          <Form.Group controlId="arrivalCity">
            <Form.Label>Ciudad de Llegada</Form.Label>
            <AutocompleteInput
              value={newRoute.arrival_city_province}
              onChange={(value) =>
                handleNewRouteChange("arrival_city_province", value)
              }
              onSelect={(suggestion) => {
                handleNewRouteChange("arrival_city", suggestion.city_name);
                handleNewRouteChange("arrival_city_id", suggestion.city_id);
                handleNewRouteChange("arrival_province", suggestion.name);
                handleNewRouteChange(
                  "arrival_province_id",
                  suggestion.province_id
                );
                handleNewRouteChange(
                  "arrival_city_province",
                  suggestion.city_province
                );
              }}
            />
          </Form.Group>
          <Form.Group controlId="comments">
            <Form.Label>Comentarios</Form.Label>
            <Form.Control
              type="text"
              value={newRoute.text}
              onChange={(e) => handleNewRouteChange("text", e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{
            backgroundColor: "var(--tranbolico-rosa)",
            color: "black",
            border: "none",
          }}
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button
          style={{
            backgroundColor: "var(--tranbolico-azulClaro)",
            color: "black",
            border: "none",
          }}
          onClick={handleAddRoute}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
