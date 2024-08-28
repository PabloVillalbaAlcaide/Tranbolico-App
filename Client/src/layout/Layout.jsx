import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./layout.scss";
import { NavBarApp } from "../components/NavBarApp/NavBarApp";
import { Footer } from "../components/Footer/Footer";
import { Row } from "react-bootstrap";

const Layout = () => {
  useEffect(() => {
    const updateHeights = () => {
      const navbar = document.querySelector(".navbar");
      const footer = document.querySelector(".contenedor-footer");

      if (navbar && footer) {
        const navbarHeight = navbar.offsetHeight;
        const footerHeight = footer.offsetHeight;

        document.documentElement.style.setProperty(
          "--navbar-height",
          `${navbarHeight}px`
        );
        document.documentElement.style.setProperty(
          "--footer-height",
          `${footerHeight}px`
        );
      }
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);

    return () => {
      window.removeEventListener("resize", updateHeights);
    };
  }, []);

  return (
    <div>
      <Row>
        <NavBarApp />
      </Row>
      <div className="container-ppal">
        <Outlet />
      </div>
      <Row>
        <Footer />
      </Row>
    </div>
  );
};

export default Layout;
