import { useContext, useEffect, useState, useCallback} from "react";
import { AppContext } from "../../context/TranbolicoContextProvider";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./editUser.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserAvatar } from "../../components/UserAvatar/UserAvatar";
import { SearchDropdown } from "../../components/locationSelector/LocationSelector";

export const EditUser = () => {
  const { globalState, setGlobalState, loading } = useContext(AppContext);
  const [editedUser, setEditedUser] = useState({});
  const [files, setFiles] = useState();
  const [errors, setErrors] = useState({});
  const [provinceId, setProvinceId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && globalState.user) {
      setEditedUser(globalState.user);
    }
  }, [loading, globalState.user]);

  useEffect(() => {
    if (editedUser.province?.province_id) {
      setProvinceId(editedUser.province.province_id);
    }
  }, [editedUser.province?.province_id]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleFilesChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const handleSelect = useCallback((field) => (value) => {
    setEditedUser((prevState) => {
      const newState = { ...prevState, [field]: value };
      if (field === 'province') {
        newState.city = {}; // Reiniciar city a un objeto vacío
      }
      return newState;
    });
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    if (editedUser.name?.length < 3 || editedUser.name?.length > 15) {
      newErrors.name = "El nombre debe contener entre 3 y 15 caracteres";
      isValid = false;
    }

    if (editedUser.surname?.length < 3 || editedUser.surname?.length > 40) {
      newErrors.surname = "El apellido debe contener entre 3 y 40 caracteres";
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (editedUser.email?.length > 320) {
      newErrors.email = "El email debe contener como máximo 320 caracteres";
      isValid = false;
    } else if (!emailPattern.test(editedUser.email)) {
      newErrors.email = "Formato de email no válido";
      isValid = false;
    }

    if (editedUser.phone_number?.length > 25) {
      newErrors.phone_number =
        "El teléfono debe contener como máximo 25 caracteres";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [editedUser]);

  const onSubmit = async (e) => {
    e.preventDefault();


    validateForm(editedUser)

    const sanitizedUser = {
      ...editedUser,
      name: editedUser.name.trim() || globalState.user.name,
      surname: editedUser.surname.trim() || globalState.user.surname,
      email: editedUser.email.trim() || globalState.user.email,
      phone_number: editedUser.phone_number.trim() || globalState.user.phone_number,
      province_name: editedUser.province.name.trim() || globalState.user.province.name,
      city_name: editedUser.city.city_name.trim() || globalState.user.city.city_name,
    };

    try {
      const formData = new FormData();
      formData.append("user", JSON.stringify(sanitizedUser));
      if (files) {
        formData.append("avatar", files);
      }

      const response = await axios.put(
        `http://localhost:4000/users/editOneUser`,
        formData,
        { headers: { Authorization: `Bearer ${globalState.token}` } }
      );
      if (response.status === 200) {
        setGlobalState({ ...globalState, user: sanitizedUser });
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setErrors({ ...errors, form: "Error al actualizar el usuario" });
    }
  };

  return (
    <>
      <Row className="justify-content-center align-items-center pt-5">
        <div className="user-avatar-container">
          <UserAvatar user={editedUser} size={120} />
        </div>
        <div className="contenedor-edit d-flex justify-content-center align-items-center mb-5">
          <Col xs={12} md={8} lg={6} xl={4}>
            <Form onSubmit={onSubmit}>
              <div className="ppal-edit text-center">
                <h2>EDITAR</h2>
              </div>

              <Form.Group className="mb-2" controlId="formBasicName">
                <Form.Control
                  className="input-form-edit"
                  type="text"
                  placeholder="Nombre"
                  name="name"
                  value={editedUser?.name}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.name && (
                <p className="text-center text-danger fw-bold">{errors.name}</p>
              )}

              <Form.Group className="mb-2" controlId="formBasicSurname">
                <Form.Control
                  className="input-form-edit"
                  type="text"
                  placeholder="Apellidos"
                  name="surname"
                  value={editedUser?.surname}
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
                  className="input-form-edit"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={editedUser?.email}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.email && (
                <p className="text-center text-danger fw-bold">
                  {errors.email}
                </p>
              )}

              <Form.Group className="mb-2" controlId="formBasicPhoneNumber">
                <Form.Control
                  className="input-form-edit"
                  type="tel"
                  placeholder="Teléfono"
                  name="phone_number"
                  value={editedUser?.phone_number}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.phone_number && (
                <p className="text-center text-danger fw-bold">
                  {errors.phone_number}
                </p>
              )}

              <Form.Group className="mb-2" controlId="formBasicGenre">
                <Form.Control
                  className="input-form-edit"
                  as="select"
                  name="genre"
                  value={editedUser.genre}
                  onChange={handleChange}
                >
                  <option value="">Seleccione</option>
                  <option value="1">Masculino</option>
                  <option value="2">Femenino</option>
                  <option value="3">Otro</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-2" controlId="formBasicProvince">
                <SearchDropdown
                  type="province"

                  selectedOption={editedUser.province}
                  handleSelect={handleSelect('province')}

                  placeholder="Provincia"
                  autoComplete="off"
                />
              </Form.Group>
              {errors.province && (
                <p className="text-center text-danger fw-bold">
                  {errors.province}
                </p>
              )}

              <Form.Group className="mb-2" controlId="formBasicCity">
                <SearchDropdown
                  type="city"

                  provinceId={provinceId}
                  selectedOption={editedUser.city}
                  handleSelect={handleSelect('city')}

                  placeholder="Ciudad"
                  autoComplete="off"
                />
              </Form.Group>
              {errors.city && (
                <p className="text-center text-danger fw-bold">{errors.city}</p>
              )}

              <Form.Group className="mb-2" controlId="formBasicImg">
                <Form.Control
                  type="file"
                  name="avatar"
                  onChange={handleFilesChange}
                />
              </Form.Group>

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
