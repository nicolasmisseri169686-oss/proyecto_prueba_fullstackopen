import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const WeatherTest = ({ lat, lon }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;
    if (!apiKey) {
      console.error("❌ No se encontró la API Key");
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.error("⚠️ Error al traer clima:", err));
  }, [lat, lon]);

  if (!weather) return <p>⏳ Cargando clima...</p>;

  return (
    <div>
      <h3>Clima en {weather.name}</h3>
      <p>🌡️ {weather.main?.temp} °C</p>
      <p>💧 Humedad: {weather.main?.humidity}%</p>
      <p>🌤️ {weather.weather?.[0]?.description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`}
        alt="icono clima"
      />
    </div>
  );
};

export default WeatherTest;
