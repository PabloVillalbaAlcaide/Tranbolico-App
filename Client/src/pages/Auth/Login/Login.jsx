// Button, Col
import "./login.scss";
import { Button, Container, Form } from "react-bootstrap";
import icono from "/images/perfil2.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../../context/TranbolicoContextProvider";

const initialValue = {
  email: "",
  password: "",
};

export const Login = () => {
  const [login, setLogin] = useState(initialValue);
  const navigate = useNavigate();
  const [msg, setMsg] = useState(false);
  const { globalState, setGlobalState } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/users/loginUser",
        login
      );
      setGlobalState({
        ...globalState,
        token: res.data.token,
        user: res.data.resultSelect[0],
      });
      localStorage.setItem("token", res.data.token);

      if (res.data.resultSelect[0].user_type === 1) {
        navigate("/home"); //enviar al administrador
      } else if (res.data.resultSelect[0].user_type === 2) {
        navigate("/home");
      }
    } catch (err) {
      console.log(err);

      if (err.response.status === 401) {
        setMsg(true);
      }
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
          <h2 className="h2-login pt-3 fs-2">login</h2>
          <Form.Group>
            <Form.Control
              className="input-form-login"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={login.email}
              name="email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              className="input-form-login mt-3 "
              type="password"
              placeholder="Contraseña"
              onChange={handleChange}
              value={login.password}
              name="password"
            />
          </Form.Group>
          {msg && <p style={{ color: "red" }}>Datos incorrectos</p>}
          <p>
            <br />
            ¿No estás Registrado?, <Link to="/register">Registrate</Link>
          </p>
          <br />
          <Button onClick={handleSubmit} className="btn-iniciar-login">
            Iniciar Sesión
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
