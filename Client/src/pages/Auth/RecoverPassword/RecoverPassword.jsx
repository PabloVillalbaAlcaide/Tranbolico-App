import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import icono from "/images/perfil2.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const RecoverPassword = () => {
  const [mail, setMail] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMail({ ...mail, [name]: value });
  };
  const onSubmit = async () => {
    try {
      console.log(mail);

      const res = await axios.post(
        "http://localhost:4000/users/recoverPassword",
        mail
      );
      console.log(res);
      navigate("/MsgRecoverPassword");
    } catch (err) {
      console.log(err, "error de recover password");
    }
  };
  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-start"
        style={{ minHeight: "100vh" }}
      >
        <div className="contenedor-login mt-5 text-center p-5 d-flex align-items-center justify-content-center flex-column">
          <div>
            <img src={icono} alt="personIcon" className="login-img p-2" />
          </div>
          <h2 className="h2-login pt-3 fs-2">Recuperar Contraseña</h2>
          <Form.Group>
            <Form.Control
              className="input-form-login"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={mail.email}
              name="email"
            />
          </Form.Group>
          <Button onClick={onSubmit} className="btn-iniciar-login">
            Recuperar Contraseña
          </Button>
          <br />
          <Button
            className="cancelar border-0 fst-italic"
            onClick={() => navigate("/")}
          >
            Volver
          </Button>
        </div>
      </Container>
    </>
  );
};
