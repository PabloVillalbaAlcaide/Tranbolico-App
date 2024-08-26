import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { AppContext } from "../../../context/TranbolicoContextProvider";
import "leaflet/dist/leaflet.css";

const center = {
  lat: 40.416775, // Coordenadas centrales (Madrid, España)
  lng: -3.70379,
};

const getCoordinates = async (city, province) => {
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search?format=json&q=${city},${province},Spain`
  );
  const { lat, lon } = response.data[0];
  return { lat: parseFloat(lat), lng: parseFloat(lon) };
};

export const StatisticsMap = () => {
  const [data, setData] = useState([]);
  const { globalState } = useContext(AppContext);

  const getData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/statistics/statisticsCity`,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );
      console.log(res.data);

      const modifiedData = await Promise.all(
        res.data.map(async (item) => {
          const coords = await getCoordinates(
            item.city_name,
            item.province_name
          );
          return {
            ...item,
            lat: coords.lat,
            lng: coords.lng,
          };
        })
      );

      setData(modifiedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data && <MapContainer
        style={{
          width: "500px",
          height: "500px",
        }}
        center={center}
        zoom={5}
      >
        <TileLayer
          url={`https://api.maptiler.com/maps/dataviz/256/{z}/{x}/{y}.png?key=${
            import.meta.env.VITE_MAPTILER_API_KEY
          }`}
          attribution='© <a href="https://www.maptiler.com/copyright/">MapTiler</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.map((item) => (
          <Marker
            key={item.city_name}
            position={{
              lat: item.lat,
              lng: item.lng,
            }}
          >
            <Popup>
              {item.city_name}, {item.province_name} ({item.total_reservations}{" "}
              reservas)
            </Popup>
          </Marker>
        ))}
      </MapContainer>}
    </>
  );
};
