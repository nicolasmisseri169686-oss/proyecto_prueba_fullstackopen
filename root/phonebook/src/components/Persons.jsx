// Componente Persons: muestra la lista de contactos filtrados
const Persons = ({ persons, filter, handleDelete }) => {
  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {/* Filtra los contactos por nombre o número según el texto ingresado en el filtro */}
        {persons
          .filter((person) =>
            // Convierte ambos valores a minúsculas para hacer la búsqueda insensible a mayúsculas
            person.name.toLowerCase().includes(filter.toLowerCase()) ||
            person.number.toLowerCase().includes(filter.toLowerCase())
          )
          // Mapea los contactos filtrados y los muestra en la lista
          .map((person, index) => (
            <li key={index}>
              {/* Muestra el nombre y el número del contacto */}
              {person.name}, {person.number} <br />
              {/* Botón para eliminar el contacto, llama a handleDelete con el id y nombre */}
              <button onClick={() => { handleDelete(person.id, person.name); }}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Persons;
