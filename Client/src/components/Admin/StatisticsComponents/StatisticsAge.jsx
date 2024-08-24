import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../context/TranbolicoContextProvider";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const StatisticsAge = () => {
  const [data, setData] = useState([]);
  const { globalState } = useContext(AppContext);

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/statistics/statisticsAge",
        { headers: { Authorization: `Bearer ${globalState.token}` } }
      );
      console.log(res);

     
      const transformedData = res.data.map(item => ({
        name: item.age_group,
        genre_1: Number(item.genre_1),
        genre_2: Number(item.genre_2),
        genre_3: Number(item.genre_3),
        genre_null: Number(item.genre_null),
      }));

      setData(transformedData); 
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData(); 
  }, []);

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="genre_1" fill="#91cad8" minPointSize={5} name="Hombre" />
          <Bar dataKey="genre_2" fill="#e3b6d4" minPointSize={10} name="Mujer" />
          <Bar dataKey="genre_3" fill="#b3b420" minPointSize={10} name="Otro" />
          <Bar dataKey="genre_null" fill="#ffd92d" minPointSize={10} name="No especifica" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
