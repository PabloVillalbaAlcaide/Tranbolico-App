import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Admin.scss";
import cerdito from "/images/Trambólico6.png";

export const Admin = () => {
  const navigate = useNavigate();
  return (
    <>
      <Row className="m-5">
        <Col>
          <div className="d-flex flex-column align-items-center ">
            <Button
              className="buttonAdmin buttonAdmin1"
              onClick={() => navigate("/admin/Routes")}
            >
              <h3 className="m-auto">Rutas</h3>
            </Button>
            <Button
              className="buttonAdmin buttonAdmin2"
              onClick={() => navigate("/admin/planning")}
            >
              <h3 className="m-auto">Planning</h3>
            </Button>

            {
              <Button
                className="buttonAdmin buttonAdmin3"
                onClick={() => navigate("/admin/viewUser")}
              >
                <h3 className="m-auto">Ver Usuario</h3>
              </Button>
            }
            <Button
              className="buttonAdmin buttonAdmin4"
              onClick={() => navigate("/admin/statistics")}
            >
              <h3 className="m-auto">Estadísticas</h3>
            </Button>
            <img src={cerdito} alt="" />
          </div>
        </Col>
      </Row>
    </>
  );
};
