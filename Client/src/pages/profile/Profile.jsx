import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { AppContext } from "../../context/TranbolicoContextProvider";
import { Link } from "react-router-dom";
import "./profile.scss";
import { UserAvatar } from "../../components/UserAvatar/UserAvatar";

export const Profile = () => {
  const { globalState, setGlobalState } = useContext(AppContext);
  // console.log(globalState);

  return (
    <>
      <Row>
        <Col>
          <div className="d-flex flex-column justify-content-center align-items-center py-5 gap-5">
            <div className="avatar-circular d-flex flex-column justify-content-center align-align-items-center">
              <div className="text-center">
                <UserAvatar user={globalState.user} size={80} />
              </div>
            </div>
            <div className="">
              <h4>
                {globalState.user.name} {globalState.user.surname}
              </h4>
              <p>{globalState.user.email}</p>
              <p>provincia, ciudad</p>
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
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
