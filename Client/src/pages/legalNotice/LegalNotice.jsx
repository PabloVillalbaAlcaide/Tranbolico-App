import React from "react";
import { Row } from "react-bootstrap";
import { TitleTram } from "../../components/TitleTram/TitleTram";

export const LegalNotice = () => {
  return (
    <div>
      {/* <Row>
        <div className="ppal-rutas text-center text-white mt-2">
          <h2 className="mb-0 py-2">AVISO LEGAL</h2>
        </div>
      </Row> */}
      <TitleTram backgroundColor={'var(--tranbolico-fucsia)'} color={"white"}>
        AVISO LEGAL
      </TitleTram>
      <Row className="justify-content-center">
        <div className="w-75 my-5">
          <ol className="text-left">
            <li>
              <strong>Aceptación de los Términos</strong>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </li>
            <li>
              <strong>Uso de la Aplicación</strong>
              <p>
                Vestibulum convallis, odio ac tristique commodo, risus nisi
                egestas justo, at pharetra arcu lorem at lectus.
              </p>
            </li>
            <li>
              <strong>Propiedad Intelectual</strong>
              <p>
                Nullam aliquet, justo id consectetur bibendum, libero felis
                eleifend sapien, vel consequat odio ligula at libero.
              </p>
            </li>
            <li>
              <strong>Lorem ipsum</strong>
              <p>
                Fusce viverra lorem ut urna sodales, a fermentum erat interdum.
              </p>
            </li>
            <li>
              <strong>Modificaciones</strong>
              <p>
                Morbi facilisis urna sit amet urna interdum, ac varius sapien
                lacinia.
              </p>
            </li>
            <li>
              <strong>Contacto</strong>
              <p>
                Proin faucibus diam at sapien ultricies, eget malesuada erat
                luctus.
              </p>
            </li>
          </ol>
        </div>
      </Row>
    </div>
  );
};
