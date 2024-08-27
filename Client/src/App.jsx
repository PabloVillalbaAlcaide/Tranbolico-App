import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { TranbolicoContextProvider } from "./context/TranbolicoContextProvider";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <Container fluid>
      <TranbolicoContextProvider>
        <AppRoutes />
      </TranbolicoContextProvider>
    </Container>
  );
}

export default App;
