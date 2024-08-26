import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../context/TranbolicoContextProvider";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const StatisticsAge = () => {
  const [data, setData] = useState([]);
  const { globalState } = useContext(AppContext);
  const [visibleKeys, setVisibleKeys] = useState({
    genre_1: true,
    genre_2: true,
    genre_3: true,
    genre_null: true,
  });

  useEffect(() => {
    getData(); 
  }, [globalState.token]);

  const getData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/statistics/statisticsAge`,
        { headers: { Authorization: `Bearer ${globalState.token}` } }
      );

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

  const toggleVisibility = (key) => {
    setVisibleKeys(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const renderButtons = () => {
    const buttons = [
      { key: 'genre_1', color: '#91cad8', name: 'Hombre' },
      { key: 'genre_2', color: '#e3b6d4', name: 'Mujer' },
      { key: 'genre_3', color: '#b3b420', name: 'Otro' },
      { key: 'genre_null', color: '#ffd92d', name: 'No especifica' },
    ];

    return (
      <div style={{ marginBottom: 10, textAlign: 'center' }} className="akkurat-font">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => toggleVisibility(button.key)}
            style={{
              cursor: 'pointer',
              color: visibleKeys[button.key] ? button.color : 'gray',
              backgroundColor: 'transparent',
              border: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              marginRight: 10,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 32 32" style={{ marginRight: 4 }}>
              <rect fill={visibleKeys[button.key] ? button.color : 'gray'} width="32" height="32" />
            </svg>
            {button.name}
          </button>
        ))}
      </div>
    );
  };

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
          {visibleKeys.genre_1 && <Bar dataKey="genre_1" fill="#91cad8" minPointSize={5} name="Hombre" />}
          {visibleKeys.genre_2 && <Bar dataKey="genre_2" fill="#e3b6d4" minPointSize={10} name="Mujer" />}
          {visibleKeys.genre_3 && <Bar dataKey="genre_3" fill="#b3b420" minPointSize={10} name="Otro" />}
          {visibleKeys.genre_null && <Bar dataKey="genre_null" fill="#ffd92d" minPointSize={10} name="No especifica" />}
        </BarChart>
      </ResponsiveContainer>
      {renderButtons()}
    </>
  );
};
