import WeatherTest from "./WeatherTest";

const CountryDetails = ({ country }) => {
  if (!country) {
    return null; // Evita romper si el país todavía no está definido
  }
  return (
    <div className="country-card">
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0] || "No disponible"}</p>
      <p>Población: {country.population}</p>
      <img
        src={country.flags?.png}
        alt={`Bandera de ${country.name.common}`}
        width="150"
      />

      {country.latlng && (
        <WeatherTest lat={country.latlng[0]} lon={country.latlng[1]} />
      )}
    </div>
  );
};

export default CountryDetails;
