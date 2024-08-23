import { useState, useContext, useEffect } from "react";
import "./ViewUserAdmin.scss";
import axios from "axios";
import { AdminUser } from "../../../components/Admin/AdminUser/AdminUser";
import { AdminUserSearch } from "../../../components/Admin/AdminUser/AdminUserSearch";
import { AppContext } from "../../../context/TranbolicoContextProvider";
import { ButtonRadio } from "../../../components/Admin/ButtonRadio/ButtonRadio";

const radios = [
  { name: "Habilitados", value: "1" },
  { name: "Deshabilitados", value: "2" },
  { name: "Todos", value: "3" },
];

export const ViewUserAdmin = () => {
  const [textSearch, setTextSearch] = useState("");
  const [option, setOption] = useState("name");
  const [info, setInfo] = useState();
  const [errMsg, setErrMsg] = useState("");
  const { globalState } = useContext(AppContext);
  const [radioValue, setRadioValue] = useState("3");

  useEffect(() => {
    onSearch();
  }, [radioValue]);

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
        `http://localhost:4000/admin/viewUser?opt=${option}&text=${textSearch}&value=${radioValue}`,
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

  const onFilterChange = (user_id) => {
    console.log(user_id);
    if (radioValue !== "3") {
      setInfo(
        info.filter((elem) => {
          if (elem.user_id !== user_id) {
            console.log(elem.user_id);
          }

          return elem.user_id !== user_id;
        })
      );
    }
  };

  return (
    <>
      {/* <Row>
        <div className="ppal-userView text-center text-white  mt-3">
          <h2 className="mb-0 py-2">USUARIOS</h2>
        </div>
      </Row> */}
      <AdminUserSearch
        handleChange={handleChange}
        option={option}
        textSearch={textSearch}
        onSearch={onSearch}
        errMsg={errMsg}
      />

      <ButtonRadio
        radioValue={radioValue}
        setRadioValue={setRadioValue}
        radios={radios}
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
                onFilterChange={onFilterChange}
              />
            </div>
          ))}
      </div>
    </>
  );
};
