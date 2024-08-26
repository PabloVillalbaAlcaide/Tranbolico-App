import axios from "axios";
import { useContext, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../context/TranbolicoContextProvider";

import { ButtonTram } from "../../../components/ButtonTram/ButtonTram";

import "./ResetPassword.scss";
import { TitleTram } from "../../../components/TitleTram/TitleTram";


const initialValue = {
  oldPassword: "",
  password: "",
};

export const ResetPassword = () => {
  const [pass, setPass] = useState(initialValue);
  const [pass2, setPass2] = useState("");
  const [errors, setErrors] = useState({});
  const { hashtoken } = useParams();
  const { globalState, setGlobalState } = useContext(AppContext);

  const validatePassword = () => {
    let valid = true;
    const newErrors = {
      password1: "",
      password2: "",
    };
    // Validamos password
    const passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
    if (!pass.password) {
      newErrors.password1 = "La contraseña es obligatoria";
      valid = false;
    } else if (pass.password.length > 100) {
      newErrors.password1 = "La contraseña debe contener como máximo 100 caracteres";
      valid = false;
    } else if (!passwordPattern.test(pass.password)) {
      newErrors.password1 = "La contraseña debe ser de más de 8 caracteres, contener al menos una mayúscula, una minúscula, y un número";
      valid = false;
    }

    // Comparamos password1 y password2
    if (pass.password !== pass2) {
      newErrors.password2 = "Las contraseñas no coinciden";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPass({ ...pass, [name]: value });
  };

  const handleChangePass2 = (e) => {
    const { value } = e.target;
    setPass2(value);
  };

  const onSubmit = async () => {
    if (!validatePassword()) {
      return;
    }
    try {
      let token = "";
      if (globalState.token) {
        token = globalState.token;
      } else {
        token = hashtoken;
      }
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/changePassword`,
        pass,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res);
      if (res.data.hash) {
        setGlobalState({
          ...globalState,
          user: { ...globalState.user, password: res.data.hash },
        });
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Row>
        {/* <div className="ppal-register text-center text-white mt-2 mb-2">
          <h2 className="mb-0 py-2">Restablecer Contraseña</h2>
        </div> */}
        <TitleTram backgroundColor={'var(--tranbolico-azul)'} color={"white"}>
          Restablecer Contraseña
        </TitleTram>
        <Container
          fluid
          className="contenedor-restablecer-password mt-5 text-center p-5 d-flex align-items-center justify-content-center flex-column"
        >
          <Col xs={12} md={10} lg={8} xl={6}>
            <div className="text-center">
              <img
                className="restablecer-img mt-1"
                src="/public/images/perfil2.png"
                alt="personIcon"
              />
            </div>
            <Form.Group>
              <Form.Control
                className="input-form-login"
                type="password"
                placeholder="Contraseña"
                onChange={handleChange}
                value={pass.oldPassword}
                name="oldPassword"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="input-form-login mt-2"
                type="password"
                placeholder="Nueva Contraseña"
                onChange={handleChange}
                value={pass.password}
                name="password"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="input-form-login mt-2"
                type="password"
                placeholder="Repite Contraseña"
                onChange={handleChangePass2}
                value={pass2}
                name="password2"
              />
            </Form.Group>

            {errors.password1 && (
              <p className="text-danger">{errors.password1}</p>
            )}
            {errors.password2 && (
              <p className="text-danger">{errors.password2}</p>
            )}

            <br />
            <div className="d-flex flex-row gap-2 align-items-center justify-content-center flex-column gap-2">

              {/* <Button onClick={onSubmit} className="btn-iniciar-login">
                Restablecer Contraseña
              </Button> */}
           
              {/* <Button
                className="btn-volver-login border-0 "
                onClick={() => navigate("/")}
              >
                Volver
              </Button> */}
             

              <ButtonTram padding="10px 27px" color="black" onClick={onSubmit}>
                Aceptar
              </ButtonTram>

              <ButtonTram
                  backgroundColor='var(--tranbolico-fucsia)'
                  onClick={() => {if(globalState?.user){navigate(-1)}else{navigate("/")}}}
                >
                  Volver
                </ButtonTram>


            </div>
          </Col>
        </Container>
      </Row>
      <br /> <br />
    </>
  );
};
