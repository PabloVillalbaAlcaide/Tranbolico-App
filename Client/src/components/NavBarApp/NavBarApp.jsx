import React from "react";
import "./NavBarApp.css";
import {Link, useNavigate} from 'react-router-dom';
import { Nav, Navbar } from "react-bootstrap";

export const NavBarApp = () => {
  const navigate = useNavigate();
  return (
    <div>
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
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto NavbarCollapse w-100">
                  <div className="d-flex justify-content-start flex-lg-row flex-column col-8">
                    <Nav.Link as={Link} to="/reservations" className="NavbarNavLink">
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
                  <div className="d-flex justify-content-xl-end justify-content-start flex-lg-row flex-column col-4">
                    <div className="NavbarRegisterLogin">
                      <Nav.Link
                        className="NavbarRegisterLoginColor"
                        onClick={()=>navigate('/register')}
                      >
                        Registro
                      </Nav.Link>
                    </div>
                    <div className="NavbarRegisterLogin">
                      <Nav.Link
                        className="NavbarRegisterLoginColor"
                        onClick={()=>navigate('/login')}
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
