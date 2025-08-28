const Persons = ({ persons, filter, handleDelete }) => {
  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {" "}
        {persons
          .filter((person) => person.name.includes(filter))
          .map((person, index) => (
            <li key={index}>
              {person.name}, {person.phone} <br />
              <button onClick={()=> {handleDelete(person.id, person.name)}}>Delete</button>
            </li>
          ))}
      </ul>{" "}
    </div>
  );
};

export default Persons;
