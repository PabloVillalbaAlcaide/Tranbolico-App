import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const AdminUserSearch = ({
  handleChange,
  option,
  textSearch,
  onSearch,
  errMsg,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-100 d-flex justify-content-center pt-3 position-relative">
      <Button
          className="btn-volver-panel position-absolute start-0 mb-2"
          onClick={() => navigate("/admin")}
        >
          Volver al panel
        </Button>
        <Form className="d-flex flex-column m-1 search form-user-search">
          <div className="d-flex justify-content-center">
            <Form.Check
              className="m-2"
              type="radio"
              label="Nombre"
              aria-label="Buscar por nombre"
              name="select"
              value="name"
              onChange={handleChange}
              checked={option === "name"}
            />
            <Form.Check
              className="m-2"
              type="radio"
              label="Teléfono"
              aria-label="Buscar por teléfono"
              name="select"
              value="phone_number"
              onChange={handleChange}
              checked={option === "phone_number"}
            />
            <Form.Check
              className="m-2"
              type="radio"
              label="E-mail"
              aria-label="Buscar por e-mail"
              name="select"
              value="email"
              onChange={handleChange}
              checked={option === "email"}
            />
          </div>
          <div className="d-flex">
            <Form.Control
              type="search"
              placeholder="Buscar"
              onChange={handleChange}
              value={textSearch}
              className="me-2"
              aria-label="Buscar"
            />
            <Button className="btn-buscarUser" onClick={onSearch}>
              Buscar
            </Button>
          </div>
          {errMsg && <Alert variant="danger">{errMsg}</Alert>}
        </Form>
      </div>
    </>
  );
};
