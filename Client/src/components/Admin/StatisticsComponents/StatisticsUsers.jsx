import { PureComponent, useContext, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Text } from "recharts";
import axios from "axios";
import { AppContext } from "../../../context/TranbolicoContextProvider";

const COLORS = ["#283583", "#e72957"];

export const StatisticsUsers = () => {
  const [data, setData] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const { globalState } = useContext(AppContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/statistics/statisticsUsers`,
        { headers: { Authorization: `Bearer ${globalState.token}` } }
      );
      const mappedArray = Object.entries(res.data[0]).map(([key, value]) => {
        value = parseInt(value);
        return { key, value };
      });
      setTotalUsers(mappedArray.shift());
      setData(mappedArray);
    } catch (err) {
      console.log(err);
    }
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, index }) => {
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <>
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${index === 0 ? "Habilitados" : "Deshabilitados"} - ${
            data[index]?.value
          }`}
        </text>
      </>
    );
  };

  return (
    <>
      {data && (
        <div className="d-flex flex-column align-items-center justify-content-center position-relative mt-5 akkurat-font">
          <PieChart
            width={800}
            height={250}
            onMouseEnter={PureComponent.onPieEnter}
          >
            <Pie
              data={data}
              cx={420}
              cy={200}
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          <span
            className="position-absolute start-50 end-50 text-nowrap"
            style={{ transform: "translate(-10px, 100px)" }}
          >
            Totales: {`${totalUsers?.value}`}
          </span>
        </div>
      )}
    </>
  );
};
