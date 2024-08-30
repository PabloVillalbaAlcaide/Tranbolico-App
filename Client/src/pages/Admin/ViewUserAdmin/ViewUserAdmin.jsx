import { useState, useContext, useEffect } from "react";
import {
  Row,
  Accordion,
  Form,
  Container,
  Spinner,
  Alert,
} from "react-bootstrap";
import "./ViewUserAdmin.scss";
import axios from "axios";
import { AppContext } from "../../../context/TranbolicoContextProvider";
import { AdminUserSearch } from "../../../components/Admin/AdminUser/AdminUserSearch";
import { ButtonRadio } from "../../../components/Admin/ButtonRadio/ButtonRadio";
import { UserHistory } from "../../../components/Admin/UserHistory/UserHistory";
import { UserReservations } from "../../../components/Admin/UserReservations/UserReservations";

const radios = [
  { name: "Habilitados", value: "1" },
  { name: "Deshabilitados", value: "2" },
  { name: "Todos", value: "3" },
];

export const ViewUserAdmin = () => {
  const [textSearch, setTextSearch] = useState("");
  const [option, setOption] = useState("name");
  const [info, setInfo] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { globalState } = useContext(AppContext);
  const [radioValue, setRadioValue] = useState("3");

  useEffect(() => {
    onSearch();
  }, [radioValue]);

  const handleChange = (e) => {
    if (e.target.type === "search") {
      setTextSearch(e.target.value);
    } else {
      setOption(e.target.value);
    }
  };

  const onSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/admin/viewUser?opt=${option}&text=${textSearch}&value=${radioValue}`,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );
      setInfo(res.data);
      setErrMsg("");
    } catch (error) {
      console.log(error);
      setErrMsg("Error al cargar los datos de los usuarios.");
    } finally {
      setLoading(false);
    }
    if (!option) {
      setErrMsg("Debes de seleccionar una opción");
    }
  };

  const handleUserChange = async (user_id, is_disabled) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/disableUser`,
        { user_id, is_disabled },
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );
      // Actualizar el estado local después de cambiar el estado del usuario
      setInfo((prevInfo) =>
        prevInfo.map((user) =>
          user.user_id === user_id ? { ...user, is_disabled } : user
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row>
        <div className="ppal-userView text-center text-white mt-3">
          <h2 className="mb-0 py-2">USUARIOS</h2>
        </div>
      </Row>
      <Container fluid="xl" className="akkurat-font">
        <AdminUserSearch
          handleChange={handleChange}
          option={option}
          textSearch={textSearch}
          onSearch={onSearch}
          errMsg={errMsg}
        />

        <div className="d-flex justify-content-center my-3">
          <ButtonRadio
            radios={radios}
            radioValue={radioValue}
            setRadioValue={setRadioValue}
          />
        </div>

        {loading ? (
          <div className="d-flex justify-content-center my-3">
            <Spinner animation="border" />
          </div>
        ) : (
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-center flex-wrap">
            {info.length > 0 ? (
              info.map((user, index) => (
                <Accordion key={index} className="w-100" defaultActiveKey="">
                  <Accordion.Item eventKey="0" className="accordion-user p-2">
                    <Accordion.Header>
                      <div className="d-flex justify-content-between w-100 px-5">
                        <h4 className="mx-auto">{user.full_name}</h4>
                        <div
                          className="d-flex align-items-center justify-content-end flex-shrink-0"
                          style={{ width: "100px" }}
                        >
                          <Form.Check
                            type="switch"
                            id="custom-switch"
                            label=""
                            checked={user.is_disabled === 0}
                            onClick={(e) => e.stopPropagation()} // Evitar que el click despliegue el acordeón
                            onChange={() =>
                              handleUserChange(
                                user.user_id,
                                user.is_disabled === 0 ? 1 : 0
                              )
                            }
                          />
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Accordion>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>
                            <strong>Datos</strong>
                          </Accordion.Header>
                          <Accordion.Body>
                            <p>Nombre: {user.full_name}</p>
                            <p>Teléfono: {user.phone_number}</p>
                            <p>Email: {user.email}</p>
                            <p>Fecha de Nacimiento: {user.birthdate}</p>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                          <Accordion.Header>
                            <strong>Historial</strong>
                          </Accordion.Header>
                          <Accordion.Body>
                            <UserHistory user_id={user.user_id} />
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                          <Accordion.Header>
                            <strong>Reservas</strong>
                          </Accordion.Header>
                          <Accordion.Body>
                            <UserReservations user_id={user.user_id} />
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))
            ) : (
              <Alert variant="info">No hay usuarios disponibles.</Alert>
            )}
          </div>
        )}
      </Container>
    </>
  );
};
