import { Button, Form } from "react-bootstrap";
export const AdminUserSearch = ({
  handleChange,
  option,
  textSearch,
  onSearch,
  errMsg,
}) => {
  return (
    <div className="w-100 d-flex justify-content-center">
      <Form className="d-flex flex-column w-25 m-3 search">
        <div className="d-flex justify-content-center">
          <Form.Check
            className="m-2"
            type="radio"
            label="Nombre"
            aria-label="radio 1"
            name="select"
            value="name"
            onChange={handleChange}
            checked={option === "name"}
          />
          <Form.Check
            className="m-2"
            type="radio"
            label="Teléfono"
            aria-label="radio 1"
            name="select"
            value="phone_number"
            onChange={handleChange}
            checked={option === "phone_number"}
          />
          <Form.Check
            className="m-2"
            type="radio"
            label="E-mail"
            aria-label="radio 1"
            name="select"
            value="email"
            onChange={handleChange}
            checked={option === "email"}
          />
        </div>
        <div className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            onChange={handleChange}
            value={textSearch}
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success" onClick={onSearch}>
            Buscar
          </Button>
        </div>
        <p style={{ color: "red" }}>{errMsg}</p>
      </Form>
    </div>
  );
};
