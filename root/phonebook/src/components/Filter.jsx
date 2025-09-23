const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      <h2>Search Contact</h2>
      Search Name{" "}
      <input
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder="Search by name (case insensitive)"
      />{" "}
      <h2>Search Contact</h2>
      Search Name{" "}
      <input
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder="Search by number (only numbers)"
      />{" "}
    </div>
  );
};

export default Filter;