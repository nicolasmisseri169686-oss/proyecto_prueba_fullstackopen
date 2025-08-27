import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import "./App.css";
import personService from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]); // Aca tengo que pasar persons del dbjson
  const [newName, setNewName] = useState(""); // input del nombre vacio al inicio
  const [newPhone, setNewPhone] = useState(""); // input del telefono vacio
  const [filter, setFilter] = useState(""); // input del buscador vacio

  // Effect-Hooks

  const hook = () => {
    // console.log("effect");
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };

  useEffect(hook, []);

  const handleSubmit = (event) => {
    event.preventDefault(); // evita que la pagina se recargue

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else if (persons.some((person) => person.phone === newPhone)) {
      alert(`${newPhone} is already added to phonebook`); // Comprobamos si existen los telefonos o los nombres
    } else {
      const nameObject = { name: newName, phone: newPhone };

      personService.create(nameObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewPhone("");
      }); // Sino existen creamos el nombre y el telefono y lo mandamos al "back"
    }
  };

  

  return (
    <div className="div1">
      <h1>PhoneBook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        handleSubmit={handleSubmit}
      />
      <Persons persons={persons} filter={filter} />
    </div>
  );
}

export default App;
