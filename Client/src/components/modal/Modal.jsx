import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ModalApp = ({element, title, text, aceptar, show, handleShow}) => {

  return (
      <Modal
        show={show}
        onHide={handleShow}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {text}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={()=>aceptar(element)}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
  );
}