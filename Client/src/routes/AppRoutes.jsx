import { BrowserRouter, Route, Routes } from "react-router-dom";


import { Home } from "../pages/Home/Home";
import { Footer } from "../components/Footer/Footer";
import { Row } from "react-bootstrap";
import { NavBarApp } from "../components/NavBarApp/NavBarApp";
import { Register } from "../pages/Auth/Register/Register";
import { Login } from "../pages/Auth/Login/Login";
import { MsgVerifyEmail } from "../pages/msg-verify-email/MsgVerifyEmail";


export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Row>
        <NavBarApp />
      </Row>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/MsgVerifyEmail" element={<MsgVerifyEmail />} />
        <Route path="/MsgVerifyEmail/:hashtoken" element={<MsgVerifyEmail />} />
      </Routes>
      <Row>
        <Footer />
      </Row>
    </BrowserRouter>
  );
};
