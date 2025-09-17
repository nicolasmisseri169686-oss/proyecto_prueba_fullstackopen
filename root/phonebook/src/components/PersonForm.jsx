const PersonForm = ({
  newName,
  setNewName,
  newPhone,
  setNewPhone,
  handleSubmit,
}) => {
  
  // Función para validar y actualizar el nombre
  const handleNameChange = (event) => {
    const input = event.target.value;
    // Permite letras, espacios, apóstrofes y guiones (para nombres compuestos)
    if (/^[a-zA-Z\s\'\-]*$/.test(input)) {
      setNewName(input);
    }
  };

  // Función para validar y actualizar el teléfono
  const handlePhoneChange = (event) => {
    const input = event.target.value;
    // Permite solo números, espacios, guiones, paréntesis y signo +
    if (/^[0-9\s\-()+]*$/.test(input)) {
      setNewPhone(input);
    }
  };

  return (
    <div>
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name{" "}
          <input
            value={newName}
            onChange={handleNameChange}
            placeholder="Enter name (letters only)"
            pattern="[a-zA-Z\s\'\-]+"
            title="Only letters, spaces, apostrophes and hyphens are allowed"
            required
          />{" "}
        </div>
        <div>
          Phone{" "}
          <input
            value={newPhone}
            onChange={handlePhoneChange}
            placeholder="Enter phone number (numbers only)"
            pattern="[0-9\s\-()+]+"
            title="Only numbers, spaces, hyphens, parentheses and plus sign are allowed"
            required
          />{" "}
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
