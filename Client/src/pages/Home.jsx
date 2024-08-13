import { Button, Container } from "react-bootstrap";
import busTranbólico from "/images/busTrambólico.jpg";
import tranbolic4 from "/images/Trambólico4.png";
import tranbolic10 from "/images/Trambólico10.png";
import tranbolic7 from "/images/Trambólico7.png";
import "./Home.scss";

export const Home = () => {
  return (
    <Container fluid className="contenedor-home">
      <main>
        <div className="d-flex align-items-center justify-content-center flex-column ">
          <h1 className="h1-main-home m-0">TRANBÓLICO</h1>
          <p className="tuvuelta-home m-0">Tu vuelta a casa sin esperas</p>
          <img src={busTranbólico} className="bus-footer me-4" />
          <div className="buscador-home d-flex mt-4 align-items-center justify-content-center m-0 ">
            <p className="origen-home">◯ Origen</p>
            <p className="destino-home">◯ Destino</p>

            <button className="btn-home-buscar mb-3">Buscar</button>
          </div>
        </div>

        <div className="contenedor-botones-home d-flex mt-4 align-items-center justify-content-center gap-4">
          <Button className="btn-reservas-home">RESERVAS</Button>
          <Button className="btn-rutas-home">RUTAS</Button>
          <Button className="btn-conocenos-home">CONÓCENOS</Button>
          <Button className="btn-faqs-home">FAQS</Button>
        </div>
        <div className="contenedor-home-criaturas d-flex align-items-center justify-content-center pb-5 pt-5">
          <div className="home-criatura-1">
            <p className="p-home-criatura-1">
              volver a casa sentada despues de una noche bailándotelo todo no
              tiene precio.
            </p>
            <img src={tranbolic4} alt="tranbolic4" />
          </div>
          <div className="home-criatura-2">
            <p className="p-home-criatura-2">
              vas a pasartelo bien, pero luego, ¿como piensas volver a casa?¿vas
              a esperar 2horas a un taxi?
            </p>
            <img src={tranbolic10} alt="tranbolic10" />
          </div>
          <div className="home-criatura-3">
            <p className="p-home-criatura-3">
              sientate y empieza a borrar las fotos que han salido borrosas de
              esta noche.
            </p>
            <img src={tranbolic7} alt="tranbolic7" />
          </div>
        </div>
      </main>
    </Container>
  );
};
