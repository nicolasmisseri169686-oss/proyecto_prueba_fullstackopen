import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([]); // Lista con algunos nombres para las pruebas del filter

  const [newName, setNewName] = useState(""); // input del nombre vacio al inicio
  const [newPhone, setNewPhone] = useState(""); // input del telefono vacio
  const [filter, setFilter] = useState(""); // input del buscador vacio

  const handleSubmit = (event) => {
    event.preventDefault(); // evita que la pagina se recargue

    if (persons.some((person) => person.name === newName)) {
      // chequeamos que la persona no exista
      alert(`${newName} or ${newPhone} is already added to phonebook`);
    }
    if (persons.some((person) => person.phone === newPhone)) {
      alert(`${newPhone} is already added to phonebook`);
    } else {
      // y si no existe continuamos con la creacion de la misma
      const nameObject = { name: newName, phone: newPhone }; // creamos un objeto con el nombre
      setPersons(persons.concat(nameObject)); // agregamos a la lista
      setNewName("");
      setNewPhone(""); // y limpiamos el input
    }
  };

  return (
    <div>
      <h1>PhoneBook</h1>

      <h2>Search Contact</h2>
      <div>
        Search Name{" "}
        <input
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />{" "}
      </div>
      <div>
        <ul>
          {persons
            .filter((person) => person.name === person.name.includes(filter))
            .map((person) => person.name === setFilter)}
        </ul>
      </div>

      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit}>
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
      </form>

      <h2>Number</h2>
      <ul>
        {persons
          .filter((person) => person.name.includes(filter))
          .map((person, index) => (
            <li key={index}>
              {person.name}, {person.phone}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
