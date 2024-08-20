import { useState } from "react";
import { Row } from "react-bootstrap";
import "./ViewUserAdmin.scss";
import axios from "axios";
import { AdminUser } from "../../../components/Admin/AdminUser/AdminUser";
import { AdminUserSearch } from "../../../components/Admin/AdminUser/AdminUserSearch";

export const ViewUserAdmin = () => {
  const [textSearch, setTextSearch] = useState("");
  const [option, setOption] = useState("");
  const [info, setInfo] = useState();
  const [errMsg, setErrMsg] = useState("");

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
        `http://localhost:4000/admin/viewUser?opt=${option}&text=${textSearch}`
      );
      setInfo(res.data);
      setErrMsg("");
    } catch (error) {
      console.log(error);
    }
    if (!option || !textSearch) {
      setErrMsg("Parámetros incorrectos");
    }
  };

  return (
    <>
      <Row>
        <div className="ppal-login text-center text-white  mt-2">
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
      {info &&
        info.map((elem, index) => (
          <div key={index}>
            <AdminUser
              full_name={elem.full_name}
              email={elem.email}
              birthdate={elem.birthdate}
              phone_number={elem.phone_number}
            />
          </div>
        ))}
    </>
  );
};
