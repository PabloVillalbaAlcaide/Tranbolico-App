import { PureComponent, useContext, useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
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
        "http://localhost:4000/statistics/statisticsUsers",
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
  console.log(data);
  
  return (
    <>
      {data && (
        <>
          <div className="d-flex flex-column">
            <span>Totales: {`${totalUsers?.value}`}</span>
            <span>Habilitados: {`${data[0]?.value}`}</span>
            <span>Deshabilitados: {`${data[1]?.value}`}</span>
          </div>
          <PieChart
            width={800}
            height={400}
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
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </>
      )}
    </>
  );
};
