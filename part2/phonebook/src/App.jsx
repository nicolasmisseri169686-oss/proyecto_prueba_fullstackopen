import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import "./App.css";

function App() {
  const [persons, setPersons] = useState([]); // Aca tengo que pasar persons del dbjson
  const [newName, setNewName] = useState(""); // input del nombre vacio al inicio
  const [newPhone, setNewPhone] = useState(""); // input del telefono vacio
  const [filter, setFilter] = useState(""); // input del buscador vacio

  const [notes, setNotes] = useState([]);

  // Effect-Hooks

  const hook = () => {
    // console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      // console.log("promise fulfilled");
      setPersons(response.data);
    });
  }

  useEffect(hook, []);

  const handleSubmit = (event) => {
    event.preventDefault(); // evita que la pagina se recargue

    if (persons.some((person) => person.name === newName)) {
      // chequeamos que la persona no exista
      alert(`${newName} is already added to phonebook`);
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
