import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const ModalApp = ({
  element,
  title,
  text,
  aceptar,
  show,
  handleShow,
}) => {
  return (
    <Modal show={show} onHide={handleShow} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button
          style={{
            backgroundColor: "var(--tranbolico-rosa)",
            color: "black",
            border: "none",
          }}
          onClick={handleShow}
        >
          Cancelar
        </Button>
        <Button
          style={{
            backgroundColor: "var(--tranbolico-azulClaro)",
            color: "black",
            border: "none",
          }}
          onClick={() => aceptar(element)}
        >
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
