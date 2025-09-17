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
    </div>
  );
};

export default Filter;