import { Row, Col, Button, Container } from "react-bootstrap";
import { FaTwitter } from "react-icons/fa";
import "../../App.css";
import "./About.scss";

export const About = () => {
  const twitterColor = "#283583";

  return (
    <Container fluid="xl" className="overflow-hidden">
      <Row className="mt-4 banner-about">
        <div className="d-flex align-items-center justify-content-md-between justify-content-center ppal-about ps-md-5 text-white flex-grow-1">
          <h2 className="pb-2 m-0">Conócenos</h2>
        </div>
        <img
          src="/images/Trambólico2.png"
          alt="tranbolic4"
          className="about-image"
        />
      </Row>

      <div className="como-funciona">
        <h3 className="fst-normal fs-1 fw-bold">
          Bienvenidos a <span className="about-trambolico">TRANBóLICO</span> la
          nueva forma de vivir el ocio nocturno.
        </h3>
        <p>
          Somos una agencia de viajes fundada en 2023, con una misión clara:
          revolucionar la manera en que disfrutas de tus noches de fiesta. Somos
          una empresa joven, con la energía y el entusiasmo necesarios para
          cambiar el concepto tradicional de salir de noche, y nacimos con esa
          intención.
        </p>
        <p>
          Nuestro origen se encuentra en Almazora, un pueblo de la provincia de
          Castellón. Desde aquí, hemos ideado una plataforma que no solo te
          lleva de fiesta, sino que transforma toda la experiencia en algo
          inolvidable. Nuestra app te permite descubrir la oferta más completa
          de ocio nocturno, abarcando todos los estilos y ambientes: desde las
          mejores salas de conciertos, discotecas y pubs, hasta los eventos más
          exclusivos, fiestas, festivales, y mucho más.
        </p>
        <p>
          Pero no solo nos enfocamos en la fiesta; también queremos que
          disfrutes al máximo de la oferta gastronómica que cada ciudad tiene
          para ofrecer. Con nosotros, podrás degustar una amplia variedad de
          opciones culinarias: desde la comida tradicional y de autor, hasta
          sushi, comida vegana, italiana, y las mejores hamburguesas. Además,
          tendrás la oportunidad de participar en jornadas gastronómicas que
          destacan los productos locales, permitiéndote saborear la esencia de
          cada destino.
        </p>
        <p>
          Todo esto lo podrás descubrir a través de nuestra App, que está
          diseñada para hacer de tu experiencia algo fácil, seguro y divertido.
          Y no estarás solo: en cada trayecto te acompañará nuestro guía
          turístico especializado, quien se encargará de mostrarte los mejores
          lugares y asegurarse de que tu noche sea perfecta.
        </p>
        <p>
          En Tranbolico , estamos comprometidos con ofrecerte mucho más que
          un simple viaje; queremos que cada salida se convierta en una
          experiencia completa, llena de momentos únicos, buena comida, y la
          mejor diversión. ¡Únete a nosotros y descubre una nueva forma de salir
          de fiesta.
        </p>
        <h3>¿Cómo funciona?</h3>
        <Row className="funciona-content">
          <Col xs={12} md={6} className="funciona-item">
            <div className="funciona-point">
              <span className="funciona-number">1</span>
            </div>
            <div className="funciona-text">
              <h2>Elige trayecto y horario de recogida</h2>
              <span>
                Escoge desde dónde necesitas trasladarte hacia Castellón en el
                horario que mejor te convenga.
              </span>
            </div>
          </Col>
          <Col xs={12} md={6} className="funciona-item">
            <div className="funciona-point">
              <span className="funciona-number">2</span>
            </div>
            <div className="funciona-text">
              <h2>Añade tu complemento</h2>
              <span>Escoge el complemento que necesitas para tu viaje.</span>
            </div>
          </Col>
          <Col xs={12} md={6} className="funciona-item">
            <div className="funciona-point">
              <span className="funciona-number">3</span>
            </div>
            <div className="funciona-text">
              <h2>Elige trayecto y horario de vuelta</h2>
              <span>
                Escoge desde dónde necesitas trasladarte hacia Castellón en el
                horario que mejor te convenga.
              </span>
            </div>
          </Col>
          <Col xs={12} md={6} className="funciona-item">
            <div className="funciona-point">
              <span className="funciona-number">4</span>
            </div>
            <div className="funciona-text">
              <h2>Realiza el pago</h2>
              <span>
                Una vez definido el complemento y trayecto, solo queda hacer el
                pago y empezar a disfrutar de la vuelta a casa sin esperas.
              </span>
            </div>
          </Col>
        </Row>
      </div>

      <Row className="amarillo align-items-center">
        <Col
          xs={12}
          md={4}
          className="d-flex align-items-center justify-content-center justify-content-md-start"
        >
          <img src="/images/Trambólico11.png" alt="Trambolico11" />
        </Col>
        <Col
          xs={12}
          md={8}
          className="d-flex align-items-center justify-content-center justify-content-md-end"
        >
          <h3>¿Qué dicen de nosotros?</h3>
        </Col>
      </Row>

      <Row className="testimonios">
        <Col xs={12} md={6} className="d-flex align-items-start">
          <div className="testimonio">
            <p>
              Descubre nuestra oferta de actividades, ocio, y restauración a las
              que asistir el día que contrates el trayecto.
            </p>
            <Button variant="none" className="twitter-button">
              <FaTwitter color={twitterColor} size={25} />
            </Button>
          </div>
        </Col>
        <Col xs={12} md={6} className="d-flex align-items-start">
          <div className="testimonio">
            <p>
              Descubre nuestra oferta de actividades, ocio, y restauración a las
              que asistir el día que contrates el trayecto.
            </p>
            <Button variant="none" className="twitter-button">
              <FaTwitter color={twitterColor} size={25} />
            </Button>
          </div>
        </Col>
        <Col xs={12} md={6} className="d-flex align-items-start">
          <div className="testimonio">
            <p>
              Descubre nuestra oferta de actividades, ocio, y restauración a las
              que asistir el día que contrates el trayecto.
            </p>
            <Button variant="none" className="twitter-button">
              <FaTwitter color={twitterColor} size={25} />
            </Button>
          </div>
        </Col>
        <Col xs={12} md={6} className="d-flex align-items-start">
          <div className="testimonio">
            <p>
              Descubre nuestra oferta de actividades, ocio, y restauración a las
              que asistir el día que contrates el trayecto.
            </p>
            <Button variant="none" className="twitter-button">
              <FaTwitter color={twitterColor} size={25} />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
