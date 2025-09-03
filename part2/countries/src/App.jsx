import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";
import WeatherTest from "./components/WeatherTest";

function App() {
  const [query, setQuery] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const countryToShow =
    selectedCountry ||
    (filteredCountries.length === 1 ? filteredCountries[0] : null);

  // Traer todos los países una sola vez
  useEffect(() => {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => res.json())
      .then((data) => {
        setAllCountries(Array.isArray(data) ? data : [data]);
        setSelectedCountry(null);
      })
      .catch(() => {
        setAllCountries([]);
        setSelectedCountry(null);
        alert("Error al cargar los países");
      });
  }, []);

  // Filtrar países cuando cambia la query
  useEffect(() => {
    if (query === "") {
      setFilteredCountries([]);
      setSelectedCountry(null);
      return;
    }

    const filtered = allCountries.filter((c) =>
      c.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [query, allCountries]);

  return (
    <div className="App">
      <h1>Buscador de Países y su clima</h1>

      <Filter query={query} setQuery={setQuery} />

      {filteredCountries.length > 10 && (
        <p>Demasiados resultados, sé más específico</p>
      )}
      {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
        <CountryList
          countries={filteredCountries}
          setSelectedCountry={setSelectedCountry}
        />
      )}
      {countryToShow && <CountryDetails country={countryToShow} />}
    </div>
  );
}

export default App;
