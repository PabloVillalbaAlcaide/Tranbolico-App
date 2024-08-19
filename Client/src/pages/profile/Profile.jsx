import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { AppContext } from "../../context/TranbolicoContextProvider";
import { Link } from "react-router-dom";
import "./profile.scss";
import { UserAvatar } from "../../components/UserAvatar/UserAvatar";
// import { locationIcon } from "./dataIcons/profileIcons";

export const Profile = () => {
  const { globalState } = useContext(AppContext);
  // console.log(globalState);

  return (
    <>
      <Row>
        <Col>
          <div className="div-profile d-flex flex-column justify-content-center align-items-center py-5 gap-5">
            <div className="avatar-circular d-flex flex-column justify-content-center align-align-items-center">
              <img
                src="/images/Trambólico3.png"
                alt="skater-icon"
                width={"200px"}
                className="skater-icon"
              />

              <div className="text-center">
                <UserAvatar user={globalState.user} size={200} />
              </div>
            </div>
            <div className="">
              <h4>
                {globalState.user.name} {globalState.user.surname}
              </h4>
              <p>{globalState.user.email}</p>
              <div>
                {/* {locationIcon} */}
                <p>provincia, ciudad</p>
              </div>
              <p>{globalState.user.birthdate}</p>
              <p>
                <Link to={"/historical"}>Historial de reservas</Link>
              </p>
              <p>
                <Link to={"/nextReservations"}>Próximas reservas</Link>
              </p>
              <p className="fst-italic text-decoration-underline">
                <Link to={"/editUser"}>Editar perfil</Link>
              </p>
              <img
                src="/images/Trambólico6.png"
                alt="rabbit-icon"
                width={"200px"}
                className="rabbit-icon"
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
