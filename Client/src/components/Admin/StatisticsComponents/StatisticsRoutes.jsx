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
} from "recharts";
import { AppContext } from "../../../context/TranbolicoContextProvider";

export const StatisticsRoutes = () => {
  const [data, setData] = useState([]);
  const { globalState } = useContext(AppContext);

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/statistics/statisticsRoutes",
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );

      // Crear una nueva propiedad concatenada
      // const modifiedData = res.data.map((item) => ({
      //   ...item,
      //   departure_combined: `${item.departure_city_id}-${item.departure_province_id}`,
      // }));

      const modifiedData = res.data.map((item, index) => ({
        ...item,
        route_name: `Ruta ${index + 1}`,
      }));

      setData(modifiedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ width: "100%", height: 300, maxWidth: 500 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
          barSize={40}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="route_name" interval={0} />
          <YAxis />
          <Legend />
          <Bar
            dataKey="total_reservation_count"
            fill="#91cad8"
            name="Reservas Totales"
          />
        </BarChart>
      </ResponsiveContainer>
      <div
        style={{
          textAlign: "center",
          marginTop: "10px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Reservas más vendidas
      </div>
    </div>
  );
};
