import { Container } from "react-bootstrap";
import { StatisticsUsers } from "../../../components/Admin/StatisticsComponents/StatisticsUsers";
import { StatisticsGenre } from "../../../components/Admin/StatisticsComponents/StatisticsGenre";
import { StatisticsAge } from "../../../components/Admin/StatisticsComponents/StatisticsAge";
import { StatisticsRoutes } from "../../../components/Admin/StatisticsComponents/StatisticsRoutes";
import { StatisticsMap } from "../../../components/Admin/StatisticsComponents/StatisticsMap";
import "./statistics.scss";

export const Statistics = () => {
  return (
    <Container fluid="xl" className="statistics-container mb-5">
      <div className="statistics-grid-container">
        <StatisticsUsers />
        <StatisticsGenre />
      </div>
      <StatisticsAge />

      <div className="statistics-grid-container">
        <StatisticsRoutes />
        <StatisticsMap />
      </div>
    </Container>
  );
};
