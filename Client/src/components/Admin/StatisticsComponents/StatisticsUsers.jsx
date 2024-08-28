import { PureComponent, useContext, useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
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
        <div
          className="d-flex flex-column align-items-center justify-content-center position-relative w-100"
          style={{ height: "400px" }}
        >
          <ResponsiveContainer>
            <PieChart
              width="100%"
              height={400}
              onMouseEnter={PureComponent.onPieEnter}
            >
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius="30%"
                outerRadius="40%"
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
          </ResponsiveContainer>
          <span
            className="position-absolute start-50 end-50 text-nowrap"
            style={{ transform: "translate(-37.5px, 30px)" }}
          >
            Totales: {`${totalUsers?.value}`}
          </span>
        </div>
      )}
    </>
  );
};
