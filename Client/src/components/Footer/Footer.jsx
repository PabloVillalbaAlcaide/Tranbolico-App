import { Button, Container } from "react-bootstrap";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import busTranbólico from "/images/busTrambólico.jpg";
import "./Footer.scss";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

export const Footer = () => {
  const phoneNumber = '34123456789';
  const defaultMessage = encodeURIComponent('Bienvenid@ a Tranbólico. ¿En qué puedo ayudarle?');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <Container
      fluid
      className="contenedor-footer d-flex flex-column justify-content-center align-items-center p-2"
    >
      <img src={busTranbólico} className="bus-footer me-4" />
      <h1 className="h1-footer m-0">TRANBÓLICO</h1>

      <p className="tuvuelta-footer m-0">Tu vuelta a casa sin esperas</p>

      <div className="iconos-footer m-0">
        <Button variant="none" href={whatsappUrl} target="_blank">
          <FaWhatsapp color="white" size={25} />
        </Button>
        <Button variant="none">
          <FaTwitter color="white" size={25} />
        </Button>
        <Button variant="none">
          <FaFacebook color="white" size={25} />
        </Button>
        <Button variant="none">
          <FaInstagram color="white" size={25} />
        </Button>
      </div>

      <div className="">
        <Link to={"/legalNotice"} className="avisolegal-footer">
          Aviso legal
        </Link>{" "}
        <span className="text-white">|</span>{" "}
        <Link to={"/privacyPolicy"} className="avisolegal-footer">
          Política de privacidad
        </Link>
      </div>

      <hr className="hr-footer m-4" />

      <p className="derechos-footer">© 2023 | Todos los derechos reservados</p>
    </Container>
  );
};