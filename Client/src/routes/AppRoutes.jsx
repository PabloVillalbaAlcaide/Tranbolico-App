import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import { Home } from "../pages/Home/Home";
import { Footer } from "../components/Footer/Footer";
import { Row } from "react-bootstrap";
import { NavBarApp } from "../components/NavBarApp/NavBarApp";
import { Register } from "../pages/Auth/Register/Register";
import { Login } from "../pages/Auth/Login/Login";
import { MsgVerifyEmail } from "../pages/msg-verify-email/MsgVerifyEmail";
import { MsgToken } from "../pages/msg-token/MsgToken";
import { Reservations } from "../pages/reservations/Reservations";
import { Rutas } from "../pages/rutas/Rutas";
import { About } from "../pages/about/About";
import { Faqs } from "../pages/faqs/Faqs";

export const AppRoutes = () => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  const logOut = () => {
    setToken();
    setUser();
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      <Row>
        <NavBarApp user={user} logOut={logOut} />
      </Row>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/routes" element={<Rutas />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setUser={setUser} setToken={setToken} />}
        />
        <Route path="/MsgVerifyEmail" element={<MsgVerifyEmail />} />
        <Route path="/MsgVerifyEmail/:hashtoken" element={<MsgToken />} />
      </Routes>
      <Row>
        <Footer />
      </Row>
    </BrowserRouter>
  );
};
