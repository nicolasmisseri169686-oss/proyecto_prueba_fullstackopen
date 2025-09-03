const Filter = ({ query, setQuery }) => {
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Indique el nombre del país"
      />
    </div>
  );
};

export default Filter;