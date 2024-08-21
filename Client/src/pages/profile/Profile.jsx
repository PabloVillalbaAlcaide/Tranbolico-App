import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { AppContext } from "../../context/TranbolicoContextProvider";
import { Link } from "react-router-dom";
import "./profile.scss";
import "../../App.css";
import { UserAvatar } from "../../components/UserAvatar/UserAvatar";
import emailIcon from "../../../src/assets/icons/email.svg";
import locationIcon from "../../../src/assets/icons/location.svg";
import birthdateIcon from "../../../src/assets/icons/birthdate.svg";
import pastBookingsIcon from "../../../src/assets/icons/pastBookings.svg";
// import futureBookingsIcon from "../../../src/assets/icons/futureBookings.svg";
import editUserProfile from "../../../src/assets/icons/editUserProfile.svg";

export const Profile = () => {
  const { globalState } = useContext(AppContext);
  console.log(globalState);

  return (
    <>
      <Row>
        <Col>
          <div className="div-profile d-flex flex-column align-items-center gap-5">
            <div className="d-flex flex-column justify-content-center">
              <img
                src="/images/Trambólico3.png"
                alt="skater-icon"
                width={"200px"}
                className="skater-icon"
              />
            </div>
            <div className="bloque-datos-usuario d-flex flex-column align-items-center gap-3">
              <div className="img-circular-usuario">
                <UserAvatar user={globalState.user} size={200} />
              </div>
              <h3>
                {globalState.user?.name} {globalState.user?.surname}
              </h3>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-2">
                  <img src={emailIcon} alt="email-icon" width={"50px"} />
                  <p>{globalState.user?.email}</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <img src={locationIcon} alt="location-icon" width={"50px"} />
                  <p>
                    {globalState.user?.province_name},{" "}
                    {globalState.user?.city_name}
                  </p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={birthdateIcon}
                    alt="birthdate-icon"
                    width={"50px"}
                  />
                  <p>
                    {globalState.user?.birthdate.split("-").reverse().join("-")}
                  </p>
                </div>
                <div className="profile-links d-flex align-items-center gap-2">
                  <img
                    src={pastBookingsIcon}
                    alt="past-bookings-icon"
                    width={"50px"}
                  />
                  <Link to={"/historical"} className="fst-italic text-dark">
                    Mis reservas
                  </Link>
                </div>
                {/* <div className="profile-links d-flex align-items-center gap-2">
                  <img
                    src={pastBookingsIcon}
                    alt="past-bookings-icon"
                    width={"50px"}
                  />
                    <Link to={"/historical"} className="fst-italic text-dark">
                      Historial de reservas
                    </Link>
                </div>
                <div className="profile-links d-flex align-items-center gap-2">
                  <img
                    src={futureBookingsIcon}
                    alt="future-bookings-icon"
                    width={"50px"}
                  />
                    <Link
                      to={"/historical/nextReservations"}
                      className="fst-italic text-dark"
                    >
                      Próximas reservas
                    </Link>
                </div> */}
                <div className="profile-links d-flex align-items-center gap-2">
                  <img
                    src={editUserProfile}
                    alt="future-bookings-icon"
                    width={"50px"}
                  />
                  <Link to={"/editUser"} className="text-dark fst-italic">
                    Editar perfil
                  </Link>
                </div>
              </div>
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
