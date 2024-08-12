import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Index } from "../pages";
import { Row } from "react-bootstrap";
import { NavBarApp } from "../components/NavBarApp/NavBarApp";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Row>
        <NavBarApp />
      </Row>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
};
