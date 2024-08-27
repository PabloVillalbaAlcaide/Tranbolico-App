import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { AppContext } from "../../../context/TranbolicoContextProvider";

export const StatisticsRoutes = () => {
  const [data, setData] = useState([]);
  const { globalState } = useContext(AppContext);

  const getData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/statistics/statisticsRoutes`,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );

      const modifiedData = res.data.map((item) => ({
        ...item,
        route_name: `${item.departure_city_name} - ${item.arrival_city_name}`,
      }));

      setData(modifiedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      style={{ width: "100%", height: 500 }}
      className="view-StatisticsRoutes"
    >
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
          barSize={40}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="route_name"
            interval={0}
            angle={-45}
            textAnchor="end"
          />
          <YAxis
            tickFormatter={(tick) => (Number.isInteger(tick) ? tick : "")}
          />
          <Legend
            width={100}
            wrapperStyle={{
              top: 40,
              right: 20,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "40px",
            }}
          />
          <Tooltip />

          <Bar
            dataKey="total_reservation_count"
            fill="#91cad8"
            name="Reservas Totales"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
