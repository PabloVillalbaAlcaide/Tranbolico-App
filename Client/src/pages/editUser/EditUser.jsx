import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/TranbolicoContextProvider";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./editUser.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const EditUser = () => {
  
  const { globalState, loading } = useContext(AppContext);
  const [editedUser, setEditedUser] = useState(globalState.user || {})
  const [files, setFiles] = useState();
  const navigate = useNavigate();



  useEffect(()=>{
    if(!loading && globalState.user){
      setEditedUser(globalState.user)
    }
  },[loading, globalState.user])

  const handleChange = (e) => {
    const {value, name} = e.target;
    setEditedUser({...editedUser, [name]: value})
  };

  const handleFilesChange = (e)=>{
    setFiles(e.target.files[0])
  }


  const onSubmit = () =>{

    editedUser.name = editedUser.name.trimStart() == "" ? globalState.user.name : editedUser.name;
    editedUser.surname = editedUser.surname.trimStart() == "" ? globalState.user.surname : editedUser.surname;
    editedUser.email = editedUser.email.trimStart() == "" ? globalState.user.email : editedUser.email;
    editedUser.phone_number = editedUser.phone_number.trimStart() == "" ? globalState.user.phone_number : editedUser.phone_number;
    
    editedUser.province_name = editedUser.province_name.trimStart() == "" ? globalState.user.province_name : editedUser.province_name;
    editedUser.city_name = editedUser.city_name.trimStart() == "" ? globalState.user.city_name : editedUser.city_name;

    
    const newFormData = new FormData();
    newFormData.append("editUser", JSON.stringify(editedUser));
    newFormData.append("file", files);
    console.log("pruebaaaaaaaaaaaaaa")

    axios
      .put('http://localhost:4000/users/editOneUser', newFormData, {headers: {Authorization: `Bearer ${globalState.token}`}})
      
      .then(res=>{
        console.log("*******", res)
      })
      .catch(err=>console.log(err))
  }
  /* const onSubmit = async (e) => {
    e.preventDefault();
    console.log(editedUser, files);
  
    try {
      // Preparar la data
      const newFormData = new FormData();
      newFormData.append("editedUser", JSON.stringify(editedUser));
      newFormData.append("file", files);
      console.log("pruebaaaaaaaaaaaaaa")
  
      // Enviar la data al backend
      const res = await axios.put(
        "http://localhost:4000/users/editOneUser",
        newFormData,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );
  
      console.log("+++++++++", res);
  
      // Actualizar el estado del usuario según la respuesta
      if (res.data.image) {
        setEditedUser({ ...editedUser, user_img: res.data.image });
      } else {
        setEditedUser(editedUser);
      }

    } catch (err) {
      console.log("Error al enviar la solicitud:", err);
    }
  }; */

  return (
    <>
      <Row>
        <div className="ppal-edit text-center">
          <h2>EDITAR</h2>
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
                  value={editedUser?.name?editedUser?.name:""}
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
                  value={editedUser?.surname?editedUser?.surname:""}
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
                  value={editedUser?.email?editedUser?.email:""}
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
                  value={editedUser?.phone_number?editedUser?.phone_number:""}
                  onChange={handleChange}
                  /* pattern="[6-7]{1}-[0-9]{8}" */
                />
              </Form.Group>
              {/* {errors.phone_number && (
                <p className="text-center text-danger fw-bold">
                  {errors.phone_number}
                </p>
              )} */}
              
              <Form.Group className="mb-2" htmlFor="selectGenre">
                <Form.Control
                  className="input-form-edit"
                  id="selectGenre"
                  as="select"
                  name="genre"
                  value={editedUser?.genre?editedUser?.genre:""}
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
                  name="province_name"
                  value={editedUser?.province_name?editedUser?.province_name:""}
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
                  name="city_name"
                  value={editedUser?.city_name?editedUser?.city_name:""}
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
                  onChange={handleFilesChange}
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
