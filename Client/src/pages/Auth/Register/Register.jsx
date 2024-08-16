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
  // const [msg, setMsg] = useState({ text: "", show: false });
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };
  console.log(register);

  const handleChangePassword2 = (e) => {
    const { value } = e.target;
    setPassword2(value);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      surname: "",
      email: "",
      phone_number: "",
      birthdate: "",
      province: "",
      city: "",
      password: "",
      password2: "",
    };

    //Validamos
    if (!register.name) {
      newErrors.name = "El nombre es obligatorio";
      valid = false;
    } else if (register.name.length < 3 || register.name.length > 15) {
      newErrors.name = "El nombre debe contener entre 3 y 15 caracteres";
      valid = false;
    }

    //Validamos apellido
    if (!register.surname) {
      newErrors.surname = "El apellido es obligatorio";
      valid = false;
    } else if (register.surname.length < 3 || register.surname.length > 40) {
      newErrors.surname = "El nombre debe contener entre 3 y 40 caracteres";
      valid = false;
    }

    //Validamos email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!register.email) {
      newErrors.email = "El email es obligatorio";
      valid = false;
    } else if (register.email.length > 320) {
      newErrors.surname = "El email debe contener como máximo 320 caracteres";
      valid = false;
    } else if (!emailPattern.test(register.email)) {
      newErrors.email = "Formato de email no válido";
      valid = false;
    }

    //Validamos teléfono
    if (!register.phone_number) {
      newErrors.phone_number = "El teléfono es obligatorio";
      valid = false;
    } else if (register.phone_number.length > 25) {
      newErrors.phone_number =
        "El teléfono debe contener como máximo 25 caracteres";
      valid = false;
    }

    //Validamos fecha de nacimiento
    if (!register.birthdate) {
      newErrors.birthdate = "La fecha de nacimiento es obligatoria";
      valid = false;
    }

    //Validamos provincia
    if (!register.province) {
      newErrors.province = "La provincia es obligatoria";
      valid = false;
    }

    //Validamos ciudad
    if (!register.city) {
      newErrors.city = "La ciudad es obligatoria";
      valid = false;
    }

    //Validamos password
    const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!register.password) {
      newErrors.password = "La contraseña es obligatoria";
      valid = false;
    } else if (register.password.length > 100) {
      newErrors.password =
        "La contraseña debe contener como máximo 100 caracteres";
      valid = false;
    } else if (!passwordPattern.test(register.password)) {
      newErrors.password =
        "La contraseña debe ser de más de 8 caracteres, contener al menos una mayúscula, una minúscula, y un número";
      valid = false;
    }

    //Comparamos password y password2
    if (register.password !== password2) {
      newErrors.password2 = "Las contraseñas no coinciden";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/users/registerUser",
        register
      );
      console.log(res);
      navigate("/MsgVerifyEmail");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Row>
        <div className="ppal-register text-center text-white mt-2 mb-2 ">
          <h2 className="mb-0 py-2">REGISTRO</h2>
        </div>
        <div className="contenedor-register d-flex justify-content-center p-5 mt-5 ">
          <Col xs={12} md={8} lg={6} xl={4}>
            <Form>
              <div className="text-center">
                <img
                  className="register-img"
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
              {errors.name && (
                <p className="text-center text-danger fw-bold">{errors.name}</p>
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
              {errors.surname && (
                <p className="text-center text-danger fw-bold">
                  {errors.surname}
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
              {errors.email && (
                <p className="text-center text-danger fw-bold">
                  {errors.email}
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
              {errors.phone_number && (
                <p className="text-center text-danger fw-bold">
                  {errors.phone_number}
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
              {errors.birthdate && (
                <p className="text-center text-danger fw-bold">
                  {errors.birthdate}
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
              {errors.province && (
                <p className="text-center text-danger fw-bold">
                  {errors.province}
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
              {errors.city && (
                <p className="text-center text-danger fw-bold">{errors.city}</p>
              )}

              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Control
                  className="input-form"
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  value={register.password}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password && (
                <p className="text-center text-danger fw-bold">
                  {errors.password}
                </p>
              )}
              <Form.Group className="mb-2" controlId="formBasicPassword2">
                <Form.Control
                  className="input-form"
                  type="password"
                  placeholder="Confirmar contraseña"
                  name="password2"
                  value={password2}
                  onChange={handleChangePassword2}
                />
              </Form.Group>
              {errors.password2 && (
                <p className="text-center text-danger fw-bold">
                  {errors.password2}
                </p>
              )}
              <p className="fw-bold fst-italic text-center mb-4 fs-6">
                <span>
                  ¿Ya tienes una cuenta? <br />
                </span>{" "}
                Ve a <Link to={"/login"}>Login</Link>
              </p>
              <div className="d-flex justify-content-center gap-2">
                <Button
                  className="btn-iniciar-login aceptar border-0 fst-italic"
                  onClick={onSubmit}
                >
                  Registrar
                </Button>
                <Button
                  className="btn-volver-login cancelar border-0 fst-italic"
                  onClick={() => navigate("/")}
                >
                  Volver
                </Button>
              </div>
            </Form>
          </Col>
        </div>
      </Row>
      <br /> <br />
    </>
  );
};
