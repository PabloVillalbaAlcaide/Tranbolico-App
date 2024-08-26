import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ButtonTram } from "../../components/ButtonTram/ButtonTram";

export const ConfirmReservation = () => {
  const navigate = useNavigate();
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
            <div className="text-center mb-3 style-verify w-25 p-5 d-flex justify-content-center flex-column align-items-center gap-3">
              <img
                src="/public/images/enviando.png"
                alt="Verify"
                width={"50px"}
              />

              <h3>¡Tu reserva está confirmada! 🎉</h3>

              <p>
                Gracias por elegir nuestro autobús turístico. Prepárate para una
                experiencia inolvidable llena de música, diversión y las mejores
                vistas de la ciudad. 🚌✨
              </p>

              {/* <Button
                style={{
                  backgroundColor: "var(--tranbolico-azulClaro)",
                  color: "black",
                  border: "none",
                }}
                onClick={() => navigate("/")}
              >
                Volver
              </Button> */}
              <ButtonTram color="black" onClick={() => navigate("/")}>
                Volver
              </ButtonTram>
            </div>
            <div className="imagen-rabbit">
              <img
                src="/public/images/Trambólico2.png"
                alt="Trambolico2"
                width={"150px"}
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
