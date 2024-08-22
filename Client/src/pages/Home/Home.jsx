import { Button, Container, Row, Col } from "react-bootstrap";
import busTranbólico from "/images/busTrambólico.jpg";
import tranbolic4 from "/images/Trambólico4.png";
import tranbolic10 from "/images/Trambólico10.png";
import tranbolic7 from "/images/Trambólico7.png";
import "./Home.scss";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useNavigate } from 'react-router-dom';  
import { useContext } from "react";
import { AppContext } from "../../context/TranbolicoContextProvider";


export const Home = () => {
  const navigate = useNavigate();
  const {globalState} = useContext(AppContext)

  const handleNavigation = () => {
    if (globalState.user) {
      navigate('/historical');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
    <br />
    <Container fluid className="contenedor-home">
      <main>
        <div className="d-flex align-items-center justify-content-center flex-column text-center ">
          <h1 className="h1-main-home m-0">TRANBÓLICO</h1>
          <p className="tuvuelta-home m-0">Tu vuelta a casa sin esperas</p>
          <img
            src={busTranbólico}
            className="bus-footer me-4"
            alt="Bus Tranbolico"
          />
          <br />
          <SearchBar />
          <br />
        </div>
        <div className="contenedor-botones-home d-flex mt-4  flex-column flex-md-row mt-4 align-items-center justify-content-center gap-4">

          <Button className="btn-reservas-home" onClick={handleNavigation}>RESERVAS</Button>
          <Button
            className="btn-rutas-home"
            onClick={() => navigate("/routes")}
          >
            RUTAS
          </Button>
          <Button
            className="btn-conocenos-home"
            onClick={() => navigate("/about")}
          >
            CONÓCENOS
          </Button>
          <Button className="btn-faqs-home" onClick={() => navigate("/faqs")}>
            FAQS
          </Button>

        </div>

        <Row className="contenedor-home-criaturas d-flex align-items-center justify-content-center pb-5 pt-5">
          <Col xs={12} md={4} className="home-criatura-1">
            <p className="p-home-criatura-1">
              volver a casa sentada despues de una noche bailándotelo todo no
              tiene precio.
            </p>
            <img src={tranbolic4} alt="tranbolic4" />
          </Col>
          <Col xs={12} md={4} className="home-criatura-2">
            <p className="p-home-criatura-2">
              vas a pasartelo bien, pero luego, ¿como piensas volver a casa?¿vas
              a esperar 2horas a un taxi?
            </p>
            <img src={tranbolic10} alt="tranbolic10" />
          </Col>
          <Col xs={12} md={4} className="home-criatura-3 text-center">
            <p className="p-home-criatura-3">
              sientate y empieza a borrar las fotos que han salido borrosas de
              esta noche.
            </p>
            <img src={tranbolic7} alt="tranbolic7" />
          </Col>
        </Row>
      </main>
    </Container>
    <br />
    </>
  );
};
