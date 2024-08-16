import "../../App.css";
import "./NavBarApp.css";

import { Link, useNavigate } from "react-router-dom";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useContext } from "react";
import { AppContext } from "../../context/TranbolicoContextProvider";

export const NavBarApp = () => {
  const navigate = useNavigate();
  const { globalState, setGlobalState } = useContext(AppContext);
  console.log(globalState);

  const logOut = () => {
    localStorage.removeItem("token");
    setGlobalState();
    navigate("/");
  };

  return (
    <div className="p-0">
      <header
        className="container-fluid d-flex justify-content-center"
        style={{ background: "var(--tranbolico-azul" }}
      >
        <div className="container-xxl d-flex justify-content-between row">
          <div className="col-lg-3 col-0 d-flex align-items-center">
            <Link to="/" className="NavbarLogo">
              TRANBÓLICO
            </Link>
          </div>
          <div className="d-flex justify-content-start col-8 ">
            <Navbar expand="lg " className="w-100">
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                className="custom-menu"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto NavbarCollapse w-100">
                  <div className="d-flex justify-content-start align-items-center flex-lg-row flex-column col-8">
                    <Nav.Link
                      as={Link}
                      to="/reservations"
                      className="NavbarNavLink"
                    >
                      Reservas
                    </Nav.Link>
                    <Nav.Link as={Link} to="/routes" className="NavbarNavLink">
                      Rutas
                    </Nav.Link>
                    <Nav.Link as={Link} to="/about" className="NavbarNavLink">
                      Conócenos
                    </Nav.Link>
                    <Nav.Link as={Link} to="/faqs" className="NavbarNavLink">
                      FAQ´S
                    </Nav.Link>
                  </div>
                  {!globalState ? (
                    <div className="d-flex justify-content-xl-end justify-content-start flex-lg-row flex-column col-4">
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
                      <div className="col-1 d-flex justify-content-center align-items-lg-center align-items-start mt-1 mt-lg-0">
                        <img
                          className="NavbarAvatar"
                          src="./images/avatar.png"
                          alt="avatar"
                          onClick={() => navigate("/profile")}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-xl-end align-items-xl-center flex-lg-row col-4 gap-4">
                      <div
                        className="avatar-user text-center"
                        onClick={() => navigate("/profile")}
                      >
                        <p className="text-danger">Imagen usuario</p>
                      </div>
                      <div className="avatar-user text-center" onClick={() => navigate("/profile")}>
                        <p className="text-white fw-bold">{globalState.user?.name} {globalState.user?.surname}</p>
                      </div>
                      <div>
                        <Button
                          onClick={logOut}
                          className="NavbarRegisterLoginColor NavbarRegisterLogin"
                        >
                          Cerrar Sesión
                        </Button>
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
