import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { AppContext } from "../../../context/TranbolicoContextProvider"

const COLORS = ["#ffd92d", "#91cad8", "#e3b6d4", "#b3b420"];

export const StatisticsGenre = () => {
  const { globalState } = useContext(AppContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    obtainData();
  }, []);

  const obtainData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/statistics/statisticsGenre`,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    genre,
    user_count,
  }) => {
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const radius2 = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x2 = cx + radius2 * Math.cos(-midAngle * RADIAN);
    const y2 = cy + radius2 * Math.sin(-midAngle * RADIAN);

    return (
      <>
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {genre === 1
            ? `Masculino - ${user_count}`
            : genre === 2
            ? `Femenino - ${user_count}`
            : genre === 3
            ? `No binario - ${user_count}`
            : `No especifica - ${user_count}`}
        </text>
        <text
          x={x2}
          y={y2}
          fill="white"
          textAnchor={x2 > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </>
    );
  };

  return (
    <div className="akkurat-font">
      {data && (
        <div className="w-100 mx-auto" style={{height:"400px"}}>
          <ResponsiveContainer>
          <PieChart width="100%" height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="user_count"
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
