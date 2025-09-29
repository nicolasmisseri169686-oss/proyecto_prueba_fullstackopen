import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import "./App.css"; // importacion de estilos
import personService from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]); // Lista de personas
  const [newName, setNewName] = useState(""); // input del nombre
  const [newPhone, setNewPhone] = useState(""); // input del telefono
  const [filter, setFilter] = useState(""); // input del buscador
  const [errorMessage, setErrorMessage] = useState(null); // Mensaje de error

  // Effect-Hooks

  const hook = () => {
  console.log('useEffect ejecutándose, llamando a getAll()');
  personService
    .getAll()
    .then((initialPersons) => {
      console.log('Éxito en App.jsx. initialPersons es:', initialPersons);
      console.log('Tipo de initialPersons:', typeof initialPersons, Array.isArray(initialPersons));
      setPersons(initialPersons);
    })
    .catch((error) => {
      console.error('Error capturado en App.jsx:', error);
      setPersons([]);
      alert("Could not load phonebook from server");
    });
};

  useEffect(hook, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((p) => p.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newPhone} It's already added to your address book, do you want to replace the old number with the new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, phone: newPhone };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== existingPerson.id ? p : returnedPerson
              )
            );
            setNewName("");
            setNewPhone("");
          })
          .catch((error) => {
            setErrorMessage(`El contacto '${newName}' ya fue eliminado del servidor`);
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
            setTimeout(() => setErrorMessage(null), 5000);
          });
      }
    } else if (persons.some((person) => person.name === newName)) {
      setErrorMessage(`${newName} is already added to phonebook`);
      setTimeout(() => setErrorMessage(null), 5000);
    } else if (persons.some((person) => person.phone === newPhone)) {
      setErrorMessage(`${newPhone} is already added to phonebook`);
      setTimeout(() => setErrorMessage(null), 5000);
    } else {
      const nameObject = { name: newName, number: newPhone };
      personService.create(nameObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewPhone("");
        })
        .catch((error) => {
          // Muestra el mensaje de error del backend
          setErrorMessage(error.response?.data?.error || 'Error al agregar contacto');
          setTimeout(() => setErrorMessage(null), 5000);
        });
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          alert(`The contact '${name}' was already removed from the server`);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div className="div1">
      <h1>PhoneBook</h1>
      {/* Muestra el mensaje de error si existe */}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        handleSubmit={handleSubmit}
      />
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
