import "./login.scss";
import { Container, Form, Row } from "react-bootstrap";
import icono from "/images/perfil2.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../../context/TranbolicoContextProvider";
import { ButtonTram } from "../../../components/ButtonTram/ButtonTram";
import { TitleTram } from "../../../components/TitleTram/TitleTram";

const initialValue = {
  email: "",
  password: "",
};

export const Login = () => {
  const [login, setLogin] = useState(initialValue);
  const navigate = useNavigate();
  const [msg, setMsg] = useState(false);
  const { globalState, setGlobalState } = useContext(AppContext);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/loginUser`,
        login
      );
      setGlobalState({
        ...globalState,
        token: res.data.token,
        user: res.data.finalResult,
      });
      localStorage.setItem("token", res.data.token);

      if (res.data.finalResult.user_type === 1) {
        navigate("/admin");
      } else if (res.data.finalResult.user_type === 2) {
        navigate("/");
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
      <Row className="mx-2">
        <TitleTram backgroundColor={"var(--tranbolico-azul)"} color={"white"}>
          LOGIN
        </TitleTram>
        <Container
          fluid
          className="p-0 mt-1  d-flex justify-content-center align-items-start mb-5"
        >
          <div className="contenedor-login my-5 px-5 mb-lg-0 text-center d-flex flex-column justify-content-center">
            <div className="div-login_img">
              <img src={icono} alt="personIcon" className="login-img mt-1" />
            </div>
            <Form.Group className="mt-4">
              <Form.Control
                className="input-form-login pb-2"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={login.email}
                name="email"
                autoFocus
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                className="input-form-login pb-2 mt-2 "
                type="password"
                placeholder="Contraseña"
                onChange={handleChange}
                value={login.password}
                name="password"
                onKeyDown={handleKeyPress}
              />
            </Form.Group>
            {/* {msg && <p style={{ color: "#e72957"}}>Datos incorrectos</p>} */}
            {msg && (
              <p className="frase-2-login fs-6 pt-2 ">
                <Link to="/recoverPassword">
                  <span>¿Has olvidado tu contraseña?</span>
                </Link>
              </p>
            )}
            <strong>
              <i>
                <p className="fs-6">
                  <br />
                  ¿No estás Registrado? <br />
                  Ve a <Link to="/register">Registro</Link>
                </p>
              </i>
            </strong>
            <br />
            <div className=" d-flex flex-row gap-2 align-items-center justify-content-center">
              <ButtonTram
                backgroundColor="var(--tranbolico-azul)"
                onClick={handleSubmit}
              >
                Aceptar
              </ButtonTram>
              <ButtonTram
                backgroundColor="var(--tranbolico-fucsia)"
                onClick={() => navigate("/")}
              >
                Volver
              </ButtonTram>
            </div>
          </div>
        </Container>
      </Row>
    </>
  );
};
