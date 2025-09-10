import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import "./App.css"; // importacion de estilos
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
            alert(`El contacto '${newName}' ya fue eliminado del servidor`);
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
    } else if (persons.some((person) => person.name === newName)) {
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
