import {Container, Form, Row } from "react-bootstrap";
import icono from "/images/perfil2.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RecoverPassword.scss";
import { ButtonTram } from "../../../components/ButtonTram/ButtonTram";
import { TitleTram } from "../../../components/TitleTram/TitleTram";

export const RecoverPassword = () => {
  const [mail, setMail] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMail({ ...mail, [name]: value });
  };
  const onSubmit = async () => {
    try {
      console.log(mail);
      setErrorMessage("");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/recoverPassword`,
        mail
      );
      console.log(res);
      navigate("/MsgRecoverPassword");
    } catch (err) {
      console.log(err);
      setErrorMessage("Correo inválido. Por favor, intente de nuevo.");
    }
  };
  return (
    <>
      <Row>
        {/* <div className="ppal-register text-center text-white mt-2 mb-2 ">
          <h2 className="mb-0 py-2">Nueva Contraseña</h2>{" "}
        </div> */}
        <TitleTram backgroundColor={'var(--tranbolico-azul)'} color={"white"}>
          Nueva Contraseña
        </TitleTram>
        <Container
          fluid
          className="p-0 mt-1 d-flex justify-content-center align-items-start"
          style={{ minHeight: "80vh" }}
        >
          <div className="contenedor-restablecer-password mt-5 text-center p-5 d-flex align-items-center justify-content-center flex-column">
            <div>
              <img
                src={icono}
                alt="personIcon"
                className="restablecer-img mt-1"
              />
            </div>
            <Form.Group>
              <Form.Control
                className="input-form-login"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={mail.email || ""}
                name="email"
              />
              {errorMessage && (
                <div className="text-danger mt-2">{errorMessage}</div>
              )}
            </Form.Group>
            <br />
            <div className="d-flex flex-row gap-2 align-items-center justify-content-center flex-column gap-2">
              {/* <Button onClick={onSubmit} className="btn-iniciar-login">
                Recuperar Contraseña
              </Button> */}
              <ButtonTram color="black" onClick={onSubmit}>
                Aceptar
              </ButtonTram>

              {/* <Button
                className="btn-volver-login border-0 fst-italic"
                onClick={() => navigate("/")}
              >
                Volver
              </Button> */}
              <ButtonTram backgroundColor='var(--tranbolico-fucsia)' onClick={() => navigate("/")}>
                Volver
              </ButtonTram>
            </div>
          </div>
        </Container>
      </Row>
    </>
  );
};
