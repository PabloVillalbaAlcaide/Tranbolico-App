import { useContext } from "react";
import { AppContext } from "../../context/TranbolicoContextProvider";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./editUser.scss";
import { useNavigate } from "react-router-dom";

export const EditUser = () => {
  const navigate = useNavigate();
  const { globalState, setGlobalState } = useContext(AppContext);
  console.log(globalState);

  const handleChange = (e) => {};

  const onSubmit = () => {};

  return (
    <>
      <Row>
        <div className="ppal-edit text-center">
          <h2 className="">EDITAR</h2>
        </div>
        <div className="contenedor-edit d-flex justify-content-center align-items-center ">
          <Col xs={12} md={8} lg={6} xl={4}>
            <Form>
              <div className="text-center">
                <img
                  className="globalState.user-img"
                  src="/public/images/perfil2.png"
                  alt="personIcon"
                  width={"50px"}
                />
              </div>
              <Form.Group className="mb-2" controlId="formBasicName">
                <Form.Control
                  className="input-form-edit"
                  type="text"
                  placeholder="Nombre"
                  name="name"
                  // value={globalState.user.name}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* {errors.name && (
                <p className="text-center text-danger fw-bold">{errors.name}</p>
              )} */}

              <Form.Group className="mb-2" controlId="formBasicSurname">
                <Form.Control
                  className="input-form-edit"
                  type="text"
                  placeholder="Apellidos"
                  name="surname"
                  // value={globalState.user.surname}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* {errors.surname && (
                <p className="text-center text-danger fw-bold">
                  {errors.surname}
                </p>
              )} */}
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Control
                  className="input-form-edit"
                  type="email"
                  placeholder="Email"
                  name="email"
                  // value={globalState.user.email}
                  onChange={handleChange}
                  /* pattern="[a-z-A-Z-0-9._%+-]+@[a-z0-9.-]+\.[a-z-A-Z]{2,4}$" */
                />
              </Form.Group>
              {/* {errors.email && (
                <p className="text-center text-danger fw-bold">
                  {errors.email}
                </p>
              )} */}
              <Form.Group className="mb-2" controlId="formBasicPhoneNumber">
                <Form.Control
                  className="input-form-edit"
                  type="tel"
                  placeholder="Teléfono"
                  name="phone_number"
                  // value={globalState.user.phone_number}
                  onChange={handleChange}
                  /* pattern="[6-7]{1}-[0-9]{8}" */
                />
              </Form.Group>
              {/* {errors.phone_number && (
                <p className="text-center text-danger fw-bold">
                  {errors.phone_number}
                </p>
              )} */}
              <Form.Group className="mb-2" controlId="formBasicGenre">
                <Form.Control
                  className="input-form-edit"
                  as="select"
                  name="genre"
                  // value={globalState.user.genre}
                  onChange={handleChange}
                >
                  <option value="">Seleccione</option>
                  <option value="1">Masculino</option>
                  <option value="2">Femenino</option>
                  <option value="3">Otro</option>
                </Form.Control>
              </Form.Group>
              {/* {errors.genre && (
                <p className="text-center text-danger fw-bold">
                  {errors.genre}
                </p>
              )} */}
              <Form.Group className="mb-2" controlId="formBasicProvince">
                <Form.Control
                  className="input-form-edit"
                  type="text"
                  placeholder="Provincia"
                  name="province"
                  // value={globalState.user.province}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* {errors.province && (
                <p className="text-center text-danger fw-bold">
                  {errors.province}
                </p>
              )} */}
              <Form.Group className="mb-2" controlId="formBasicCity">
                <Form.Control
                  className="input-form-edit"
                  type="text"
                  placeholder="Ciudad"
                  name="city"
                  // value={globalState.user.city}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* {errors.city && (
                <p className="text-center text-danger fw-bold">{errors.city}</p>
              )} */}

              <Form.Group className="mb-2" controlId="formBasicImg">
                <Form.Control
                  type="file"
                  name="avatar"
                  // value={avatar}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* {errors.img && (
                <p className="text-center text-danger fw-bold">
                  {errors.img}
                </p>
              )} */}

              <div className="d-flex justify-content-center gap-2">
                <Button
                  className="btn-iniciar-login aceptar border-0 fst-italic"
                  onClick={onSubmit}
                >
                  Aceptar
                </Button>
                <Button
                  className="btn-volver-login cancelar border-0 fst-italic"
                  onClick={() => navigate("/profile")}
                >
                  Cancelar
                </Button>
              </div>
            </Form>
          </Col>
        </div>
      </Row>
    </>
  );
};
