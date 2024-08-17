import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Admin.scss";
import cerdito from "/images/Trambólico6.png";

export const Admin = () => {
  const navigate = useNavigate();
  return (
    <>
      <Row>
        <div className="text-center text-white mt-2 mb-2 ">
          <h2 className="mb-0 py-2">Administrador</h2>
        </div>
        <Col>
          <div className="d-flex flex-column align-items-center ">
            <Button
              className="buttonAdmin"
              onClick={() => navigate("/admin/createRoute")}
            >
              <h3 className="m-auto">Crear Rutas</h3>
            </Button>

            <Button
              className="buttonAdmin"
              onClick={() => navigate("/admin/editRoute")}
            >
              <h3 className="m-auto">Editar Rutas</h3>
            </Button>

            <Button
              className="buttonAdmin"
              onClick={() => navigate("/admin/viewUser")}
            >
              <h3 className="m-auto">Ver Usuario</h3>
            </Button>
            <img src={cerdito} alt="" />
          </div>
        </Col>
      </Row>
    </>
  );
};
