const PersonForm = ({
  newName,
  setNewName,
  newPhone,
  setNewPhone,
  handleSubmit,
}) => {
  return (
    <div>
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit}>
        {" "}
        {/*Comienza el component <PersonForm/> */}
        <div>
          Name{" "}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />{" "}
        </div>
        <div>
          Phone{" "}
          <input
            value={newPhone}
            onChange={(event) => setNewPhone(event.target.value)}
          />{" "}
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>{" "}
    </div>
  );
};

export default PersonForm;
