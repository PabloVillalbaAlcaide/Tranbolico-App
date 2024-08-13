import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Row } from "react-bootstrap";
import { NavBarApp } from "../components/NavBarApp/NavBarApp";
import { Footer } from "../components/Footer/Footer";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Row>
        <NavBarApp />
      </Row>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Row>
        <Footer />
      </Row>
    </BrowserRouter>
  );
};
