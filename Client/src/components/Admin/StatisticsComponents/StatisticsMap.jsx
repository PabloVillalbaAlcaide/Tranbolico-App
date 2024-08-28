import { useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { AppContext } from "../../../context/TranbolicoContextProvider";
import { scaleLinear } from "d3-scale";
import "leaflet/dist/leaflet.css";
import "./statisticsMap.scss";

const center = {
  lat: 40.416775, // Coordenadas centrales (Madrid, España)
  lng: -3.70379,
};

const coordinatesCache = {};

const getCoordinates = async (city, province) => {
  const key = `${city}-${province}`;
  if (coordinatesCache[key]) {
    return coordinatesCache[key];
  }
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${city},${province},Spain`
    );
    if (response.data.length === 0) {
      throw new Error("No coordinates found");
    }
    const { lat, lon } = response.data[0];
    const coords = { lat: parseFloat(lat), lng: parseFloat(lon) };
    coordinatesCache[key] = coords;
    return coords;
  } catch (error) {
    console.error(
      `Error fetching coordinates for ${city}, ${province}:`,
      error
    );
    return { lat: 0, lng: 0 }; // Coordenadas por defecto en caso de error
  }
};

const colorScale = scaleLinear()
  .domain([0, 0.5, 1])
  .range(["green", "yellow", "red"]);

const getColor = (reservations, minReservations, maxReservations) => {
  const ratio =
    (reservations - minReservations) / (maxReservations - minReservations);
  return colorScale(ratio);
};

export const StatisticsMap = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { globalState } = useContext(AppContext);

  const getData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/statistics/statisticsCity`,
        {
          headers: { Authorization: `Bearer ${globalState.token}` },
        }
      );

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
      setError(`Error al obtener los datos: ${err.message}`);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const minReservations = useMemo(
    () => Math.min(...data.map((item) => item.total_reservations)),
    [data]
  );
  const maxReservations = useMemo(
    () => Math.max(...data.map((item) => item.total_reservations)),
    [data]
  );

  return (
    <>
      {loading && <p>Cargando datos...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div className="map-container w-100">
          <MapContainer
            className="view-StatisticsMap"
            style={{
              width: "100%",
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
              <CircleMarker
                key={item.city_name}
                center={{
                  lat: item.lat,
                  lng: item.lng,
                }}
                radius={10}
                color={getColor(
                  item.total_reservations,
                  minReservations,
                  maxReservations
                )}
                weight={0}
                fillOpacity={0.7}
              >
                <Popup>
                  {item.city_name}, {item.province_name} (
                  {item.total_reservations} reservas)
                </Popup>
              </CircleMarker>
            ))}
            <div className="legend" />
          </MapContainer>
        </div>
      )}
    </>
  );
};
