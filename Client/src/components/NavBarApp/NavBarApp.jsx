import "../../App.css";
import "./NavBarApp.css";

import { Link, useNavigate } from "react-router-dom";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/TranbolicoContextProvider";
import { UserAvatar } from "../UserAvatar/UserAvatar";

export const NavBarApp = () => {
  const navigate = useNavigate();
  const { globalState, setGlobalState } = useContext(AppContext);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 992);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logOut = () => {
    const newGlobalState = { ...globalState };
    delete newGlobalState.user;
    delete newGlobalState.token;

    localStorage.removeItem("token");
    setGlobalState(newGlobalState);
    navigate("/");
  };

  const handleNavigation = () => {
    if (globalState.user) {
      navigate("/myReservations");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="p-0 navbar">
      <header
        className="container-fluid d-flex justify-content-center"
        style={{ background: "var(--tranbolico-azul" }}
      >
        <div className="container-xxl d-flex justify-content-between row">
          <div className="col-lg-4 d-flex align-items-center">
            <Link to="/" className="NavbarLogo">
              TRANBÓLICO
            </Link>
          </div>
          <div className="d-flex justify-content-start align-items-center col-lg-8">
            <Navbar expand="lg " className="w-100">
              <div className="d-flex align-items-center">
                <Navbar.Toggle
                  aria-controls="basic-navbar-nav"
                  className="custom-menu"
                />
                <Link to="/" className="NavbarLogoMobile">
                  TRANBÓLICO
                </Link>
              </div>
              {!isWideScreen && (
                <div className="d-flex justify-content-center align-items-center gap-4">
                  <div
                    className="avatar-user-navbar text-center"
                    onClick={() => navigate("/profile")}
                  >
                    <UserAvatar user={globalState.user} size={50} />
                  </div>
                  <div
                    className="user-name-navbar text-center"
                    onClick={() => navigate("/profile")}
                  >
                    <p className="text-white fw-bold">
                      {globalState.user?.name}
                    </p>
                  </div>
                </div>
              )}
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto NavbarCollapse w-100">
                  <div className="d-flex justify-content-start align-items-lg-center flex-lg-row flex-column col-8">
                    {globalState.user?.user_type === 1 ? (
                      <div className="d-flex justify-content-start align-items-lg-center flex-lg-row flex-column col-12">
                        <Nav.Link
                          as={Link}
                          to="/admin"
                          className="NavbarNavLink"
                        >
                          Admin
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/routes"
                          className="NavbarNavLink"
                        >
                          Rutas
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/about"
                          className="NavbarNavLink"
                        >
                          Conócenos
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/faqs"
                          className="NavbarNavLink"
                        >
                          FAQ´S
                        </Nav.Link>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-start align-items-lg-center flex-lg-row flex-column col-12">
                        <Nav.Link
                          as={Link}
                          to="/routes"
                          className="NavbarNavLink"
                        >
                          Rutas
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/about"
                          className="NavbarNavLink"
                        >
                          Conócenos
                        </Nav.Link>

                        <Nav.Link
                          onClick={handleNavigation}
                          className="NavbarNavLink"
                        >
                          Mis Reservas
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/faqs"
                          className="NavbarNavLink"
                        >
                          FAQ´S
                        </Nav.Link>
                      </div>
                    )}
                  </div>
                  {!globalState.user || !globalState.token ? (
                    <div className="d-flex justify-content-xl-end  flex-lg-row flex-column align-items-lg-center">
                      <div className="NavbarRegisterLogin">
                        <Nav.Link
                          className="NavbarRegisterLoginColor"
                          onClick={() => navigate("/register")}
                        >
                          Registro
                        </Nav.Link>
                      </div>
                      <div className="NavbarRegisterLogin">
                        <Nav.Link
                          className="NavbarRegisterLoginColor"
                          onClick={() => navigate("/login")}
                        >
                          Login
                        </Nav.Link>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-xl-end  align-items-lg-center align-items-center flex-lg-row col-4 gap-4">
                      <div
                        className="avatar-user text-center"
                        onClick={() => navigate("/profile")}
                      >
                        <UserAvatar user={globalState.user} size={50} />
                      </div>
                      <div
                        className="avatar-user text-center"
                        onClick={() => navigate("/profile")}
                      >
                        <p className="text-white fw-bold">
                          {globalState.user?.name}
                        </p>
                      </div>
                      <div>
                        {isWideScreen ? (
                          <Button
                            onClick={logOut}
                            className="NavbarRegisterLoginColor NavbarLogout"
                          >
                            Cerrar sesión
                          </Button>
                        ) : (
                          <Nav.Link
                            onClick={logOut}
                            className="NavbarNavLink text-decoration-underline"
                          >
                            Cerrar sesión
                          </Nav.Link>
                        )}
                      </div>
                    </div>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
      </header>
    </div>
  );
};
