import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../App.css";
import "./errorPage.scss";

export const ErrorPage = () => {
  return (
    <>
      <Row>
        <Col>
          <div className="d-flex flex-column align-items-center justify-content-center ppal-verify">
            <div className="imagen-pollo">
              <img
                src="/public/images/Trambólico.png"
                alt="Trambolico"
                width={"150px"}
              />
            </div>
            <div className="text-center mb-3 style-verify w-25 p-5 d-flex justify-content-center flex-column align-items-center">
              <h3>Ha ocurrido un error</h3>
              <p>
                Lo sentimos, algo ha salido mal. Estamos trabajando para
                solucionarlo lo antes posible. Vuelve a intentarlo más tarde.
              </p>
            </div>
            <div className="imagen-rabbit">
              <img
                src="/public/images/Trambólico5.png"
                alt="Trambolico5"
                width={"150px"}
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
