import React from "react";
import "./NavBarApp.css";
import { Nav, Navbar, NavbarBrand } from "react-bootstrap";

export const NavBarApp = () => {
  return (
    <div>
      <header
        className="container-fluid d-flex justify-content-center"
        style={{ background: "var(--tranbolico-azul" }}
      >
        <div className="container-xxl d-flex justify-content-between row">
          <div className="col-lg-3 col-0 d-flex align-items-center">
            <NavbarBrand href="#home" className="NavbarLogo ">
              TRANBÓLICO
            </NavbarBrand>
          </div>
          <div className="d-flex justify-content-start col-8 ">
            <Navbar expand="lg " className="w-100">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto NavbarCollapse w-100">
                  <div className="d-flex justify-content-start flex-lg-row flex-column col-8">
                    <Nav.Link className="NavbarNavLink" href="#home">
                      Reservas
                    </Nav.Link>
                    <Nav.Link className="NavbarNavLink" href="#link">
                      Rutas
                    </Nav.Link>
                    <Nav.Link className="NavbarNavLink" href="#link">
                      Conócenos
                    </Nav.Link>
                    <Nav.Link className="NavbarNavLink" href="#link">
                      FAQ´S
                    </Nav.Link>
                  </div>
                  <div className="d-flex justify-content-xl-end justify-content-start flex-lg-row flex-column col-4">
                    <div className="NavbarRegisterLogin">
                      <Nav.Link
                        className="NavbarRegisterLoginColor"
                        href="#link"
                      >
                        Registro
                      </Nav.Link>
                    </div>
                    <div className="NavbarRegisterLogin">
                      <Nav.Link
                        className="NavbarRegisterLoginColor"
                        href="#link"
                      >
                        Login
                      </Nav.Link>
                    </div>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
          <div className="col-1 d-flex justify-content-center align-items-center">
            <img
              className="NavbarAvatar"
              src="./images/avatar.png"
              alt="avatar"
            />
          </div>
        </div>
      </header>
    </div>
  );
};
