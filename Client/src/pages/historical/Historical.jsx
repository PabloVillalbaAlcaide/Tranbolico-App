import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import "./historical.scss";
import { UserAvatar } from "../../components/UserAvatar/UserAvatar";
import { AppContext } from "../../context/TranbolicoContextProvider";
import { TitleTram } from "../../components/TitleTram/TitleTram";

export const Historical = () => {
  const [hist, setHist] = useState("myReservations");
  const { globalState } = useContext(AppContext);

  return (
    <>
      <TitleTram backgroundColor={"var(--tranbolico-azul)"} color={"white"}>
        MIS RESERVAS
      </TitleTram>
      <Container>
        <Row className="historial-contenedor py-4 flex-column align-items-center justify-content-center">
          <Col>
            <div className="d-flex justify-content-center align-items-center">
              <UserAvatar user={globalState.user} size={200} />
            </div>
          </Col>
          <Col>
            <div className="w-100 d-flex justify-content-center mt-5">
              <button
                className={`historical-button ${
                  hist === "historical" ? "active" : ""
                }`}
                onClick={() => setHist("historical")}
              >
                Historial
              </button>
              <button
                className={`historical-button ${
                  hist === "myReservations" ? "active" : ""
                }`}
                onClick={() => setHist("myReservations")}
              >
                Reservas
              </button>
            </div>
            <Outlet context={{ hist }} />
          </Col>
        </Row>
      </Container>
    </>
  );
};
