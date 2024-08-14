import { Link, useNavigate } from "react-router-dom";
import "../../../App.css";
import "./register.scss";

import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const initialValue = {
  name: "",
  surname: "",
  email: "",
  phone_number: "",
  birthdate: "",
  genre: "",
  city: "",
  province: "",
  password: "",
};

export const Register = () => {
  const [register, setRegister] = useState(initialValue);
  const navigate = useNavigate();
  const [msg, setMsg] = useState({ text: "", show: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };
  console.log(register);

  const onSubmit = async () => {
    if (
      !register.name ||
      !register.surname ||
      !register.email ||
      !register.phone_number ||
      !register.birthdate ||
      !register.city ||
      !register.province ||
      !register.password
    ) {
      setMsg({ show: true });
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:4000/users/registerUser",
        register
      );
      console.log(res);
      setMsg({ show: false, text: "" });
      navigate("/MsgVerifyEmail");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Row>
        <div className="ppal-register text-center text-white">
          <h2 className="mb-0 py-2">REGISTRO</h2>
        </div>
        <div className="d-flex justify-content-center py-4">
          <Col xs={12} md={8} lg={6} xl={4} className="w-50">
            <Form>
              <div className="text-center mb-3">
                <img
                  src="/public/images/perfil2.png"
                  alt="personIcon"
                  width={"50px"}
                />
              </div>
              <Form.Group className="mb-2" controlId="formBasicName">
                <Form.Control
                  className="input-form"
                  type="text"
                  placeholder="Nombre"
                  name="name"
                  value={register.name}
                  onChange={handleChange}
                />
              </Form.Group>
              {msg.show && (
                <p className="text-danger text-center mb-2">
                  {(msg.text = "Campo requerido")}
                </p>
              )}

              <Form.Group className="mb-2" controlId="formBasicSurname">
                <Form.Control
                  className="input-form"
                  type="text"
                  placeholder="Apellidos"
                  name="surname"
                  value={register.surname}
                  onChange={handleChange}
                />
              </Form.Group>
              {msg.show && (
                <p className="text-danger text-center mb-2">
                  {(msg.text = "Campo requerido")}
                </p>
              )}
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Control
                  className="input-form"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={register.email}
                  onChange={handleChange}
                  /* pattern="[a-z-A-Z-0-9._%+-]+@[a-z0-9.-]+\.[a-z-A-Z]{2,4}$" */
                />
              </Form.Group>
              {msg.show && (
                <p className="text-danger text-center">
                  {(msg.text = "Campo requerido")}
                </p>
              )}
              <Form.Group className="mb-2" controlId="formBasicPhoneNumber">
                <Form.Control
                  className="input-form"
                  type="tel"
                  placeholder="Teléfono"
                  name="phone_number"
                  value={register.phone_number}
                  onChange={handleChange}
                  /* pattern="[6-7]{1}-[0-9]{8}" */
                />
              </Form.Group>
              {msg.show && (
                <p className="text-danger text-center mb-2">
                  {(msg.text = "Campo requerido")}
                </p>
              )}
              <Form.Group className="mb-2" controlId="formBasicBirthDate">
                <Form.Control
                  className="input-form"
                  type="date"
                  placeholder="Fecha de nacimiento"
                  name="birthdate"
                  value={register.birthdate}
                  onChange={handleChange}
                />
              </Form.Group>
              {msg.show && (
                <p className="text-danger text-center mb-2">
                  {(msg.text = "Campo requerido")}
                </p>
              )}
              <Form.Group className="mb-2" controlId="formBasicGenre">
                <Form.Control
                  className="input-form"
                  as="select"
                  name="genre"
                  value={register.genre}
                  onChange={handleChange}
                >
                  <option value="">Seleccione</option>
                  <option value="1">Masculino</option>
                  <option value="2">Femenino</option>
                  <option value="3">Otro</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicProvince">
                <Form.Control
                  className="input-form"
                  type="text"
                  placeholder="Provincia"
                  name="province"
                  value={register.province}
                  onChange={handleChange}
                />
              </Form.Group>
              {msg.show && (
                <p className="text-danger text-center mb-2">
                  {(msg.text = "Campo requerido")}
                </p>
              )}
              <Form.Group className="mb-2" controlId="formBasicCity">
                <Form.Control
                  className="input-form"
                  type="text"
                  placeholder="Ciudad"
                  name="city"
                  value={register.city}
                  onChange={handleChange}
                />
              </Form.Group>
              {msg.show && (
                <p className="text-danger text-center mb-2">
                  {(msg.text = "Campo requerido")}
                </p>
              )}
              

              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Control
                  className="input-form"
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  value={register.password}
                  onChange={handleChange}
                  /* pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}" */
                />
              </Form.Group>
              {msg.show && (
                <p className="text-danger text-center mb-2">
                  {(msg.text = "Campo requerido")}
                </p>
              )}
              <Form.Group className="mb-2" controlId="formBasicPassword2">
                <Form.Control
                  className="input-form"
                  type="password"
                  placeholder="Confirmar contraseña"
                  name="password2"
                  value={register.password}
                  onChange={handleChange}
                  /* pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}" */
                />
              </Form.Group>
              {msg.show && (
                <p className="text-danger text-center mb-2">
                  {(msg.text = "Campo requerido")}
                </p>
              )}
              {/* {msg.show && (
                <p className="text-danger text-center">{msg.text}</p>
              )} */}
              <p className="fw-bold fst-italic text-center mb-2">
                <span className="text-decoration-underline">
                  ¿Ya tienes una cuenta?
                </span>{" "}
                Ve a <Link to={"/login"}>Login</Link>
              </p>
              <div className="d-flex justify-content-center gap-4">
                <Button
                  className="aceptar border-0 fst-italic"
                  onClick={onSubmit}
                >
                  Registrar
                </Button>
                <Button
                  className="cancelar border-0 fst-italic"
                  onClick={() => navigate("/")}
                >
                  Volver
                </Button>
              </div>
            </Form>
          </Col>
        </div>
      </Row>
    </>
  );
};
