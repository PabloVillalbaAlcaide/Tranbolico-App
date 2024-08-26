import { StatisticsUsers } from "../../../components/Admin/StatisticsComponents/StatisticsUsers";
import { StatisticsRoutes } from "../../../components/Admin/StatisticsComponents/StatisticsRoutes";
import { StatisticsAge } from "../../../components/Admin/StatisticsComponents/StatisticsAge";
import { StatisticsGenre } from "../../../components/Admin/StatisticsComponents/StatisticsGenre";
import { StatisticsMap } from "../../../components/Admin/StatisticsComponents/StatisticsMap";
import { Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Statistics = () => {
  const navigate = useNavigate();

  return (
    <>
      <Row>
        <div className="ppal-userView text-center text-white mt-3">
          <h2 className="mb-0 py-2">ESTADÍSTICAS</h2>
        </div>
      </Row>
      <Button
        className="btn-volver-panel position-absolute start-0 mt-4 ms-4 akkurat-font"
        onClick={() => navigate("/admin")}
      >
        Volver al panel
      </Button>
      <StatisticsUsers />
      <StatisticsRoutes />
      <StatisticsAge />
      <StatisticsGenre />
      <StatisticsMap />
      <br />
    </>
  );
};
