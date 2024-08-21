import { useState, useContext, useEffect } from "react";
import { Row } from "react-bootstrap";
import "./ViewUserAdmin.scss";
import axios from "axios";
import { AdminUser } from "../../../components/Admin/AdminUser/AdminUser";
import { AdminUserSearch } from "../../../components/Admin/AdminUser/AdminUserSearch";
import { AppContext } from "../../../context/TranbolicoContextProvider";

export const ViewUserAdmin = () => {
  const [textSearch, setTextSearch] = useState("");
  const [option, setOption] = useState("name");
  const [info, setInfo] = useState();
  const [errMsg, setErrMsg] = useState("");
  const { globalState } = useContext(AppContext);

  //seteamos los parámetros del buscador
  const handleChange = (e) => {
    if (e.target.type === "search") {
      setTextSearch(e.target.value);
    } else {
      setOption(e.target.value);
    }
  };

  //enviamos la búsqueda al back
  const onSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/admin/viewUser?opt=${option}&text=${textSearch}`,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );
      setInfo(res.data);
      setErrMsg("");
    } catch (error) {
      console.log(error);
    }
    if (!option) {
      setErrMsg("Debes de selecionar una opción");
    }
  };

  return (
    <>
      <Row>
        <div className="ppal-userView text-center text-white  mt-3">
          <h2 className="mb-0 py-2">USUARIOS</h2>
        </div>
      </Row>
      <AdminUserSearch
        handleChange={handleChange}
        option={option}
        textSearch={textSearch}
        onSearch={onSearch}
        errMsg={errMsg}
      />

      <div className="d-flex flex-column flex-md-row align-items-center justify-content-center flex-wrap">
        {info &&
          info.map((elem, index) => (
            <div key={index} className="mt-4">
              <AdminUser
                user_id={elem.user_id}
                full_name={elem.full_name}
                email={elem.email}
                birthdate={elem.birthdate}
                phone_number={elem.phone_number}
                is_disabled={elem.is_disabled}
              />
            </div>
          ))}
      </div>
    </>
  );
};
