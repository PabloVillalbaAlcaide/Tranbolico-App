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
  LabelList,
  Text,
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
      console.log(res.data);
      
      const modifiedData = res.data.map((item) => ({
        ...item,
        route_name: `${item.departure_city_name} - ${item.arrival_city_name
        }`,
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
    <div style={{ width: "100%", height: 300, maxWidth: 500 }}>
      <ResponsiveContainer width="100%" height="100%">
      <Text x={"50%"} y={20} textAnchor="middle" dominantBaseline="middle">
            Rutas más solicitadas
          </Text>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
          barSize={40}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="route_name" interval={0} angle={-45} textAnchor="end" />
          <YAxis tickFormatter={(tick) => Number.isInteger(tick) ? tick : ''} />
          <Legend verticalAlign="top" height={36} />
          <Bar
            dataKey="total_reservation_count"
            fill="#91cad8"
            name="Reservas Totales"
          >
            <LabelList dataKey="total_reservation_count" position="top" />
          </Bar> 
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
