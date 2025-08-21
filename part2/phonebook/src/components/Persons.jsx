const Persons = ({ persons, filter }) => {
  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {" "}
        {persons
          .filter((person) => person.name.includes(filter))
          .map((person, index) => (
            <li key={index}>
              {person.name}, {person.phone}
            </li>
          ))}
      </ul>{" "}
    </div>
  );
};

export default Persons;
