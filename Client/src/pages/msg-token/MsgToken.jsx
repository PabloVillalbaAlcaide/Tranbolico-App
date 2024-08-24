import { useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../App.css";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/TranbolicoContextProvider";
import axios from "axios";
import { Button } from "react-bootstrap";
import { ButtonTram } from "../../components/ButtonTram/ButtonTram";

export const MsgToken = () => {
  const { globalState, setGlobalState } = useContext(AppContext);
  const navigate = useNavigate();

  const { hashtoken } = useParams();
  useEffect(() => {
    verifyUser(hashtoken);
  }, []);

  const verifyUser = async (token) => {
    try {
      const res = await axios.put(
        "http://localhost:4000/users/verifyUser",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(res);

      setGlobalState({
        ...globalState,
        token: res.data.token,
        user: res.data.finalResult,
      });
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(globalState);

  return (
    <>
      <Row>
        <Col>
          <div className="d-flex flex-column align-items-center justify-content-center ppal-verify">
            <div className="imagen-pollo">
              <img
                src="/public/images/Trambólico.png"
                alt="Trambolico"
                width={"150px"}
              />
            </div>
            <div className="text-center mb-3 style-verify w-25 p-5 d-flex justify-content-center flex-column align-items-center">
              <img
                src="/public/images/enviando.png"
                alt="Verify"
                width={"50px"}
              />

              <h3  style={{fontWeight:'bold'}}>Verificación por email</h3>


              {/* <Button

              <p style={{fontSize:'1.12rem'}}>Cuenta verificada correctamente</p>
              <br />
              <Button

                style={{
                  backgroundColor: "var(--tranbolico-azulClaro)",
                  color: "var(--tranbolico-azul)",
                  fontSize: "1.4rem",
                  border: "none",
                }}
                onClick={() => navigate("/")}
              >
                Aceptar
              </Button> */}
              <ButtonTram color="black" onClick={() => navigate("/")}>
                Aceptar
              </ButtonTram>
            </div>
            <div className="imagen-rabbit">
              <img
                src="/public/images/Trambólico2.png"
                alt="Trambolico2"
                width={"150px"}
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
