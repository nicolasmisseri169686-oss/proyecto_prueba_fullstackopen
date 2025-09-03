const CountryList = ({ countries, setSelectedCountry }) => {
  return (
    <ul>
      {countries.map((c) => (
        <li key={c.cca3}>
          {c.name.common}
          <button onClick={() => {setSelectedCountry(c)}}>Show</button>
        
        </li>
      ))}
    </ul>
  );
};

export default CountryList;