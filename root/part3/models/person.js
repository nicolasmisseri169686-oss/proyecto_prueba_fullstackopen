const mongoose = require('mongoose');

// Definimos el esquema para la persona
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3, // El nombre debe tener al menos 3 caracteres
    required: true // El nombre es obligatorio
  },
  number: {
    type: String,
    minLength: 8, // El número debe tener al menos 8 caracteres
    required: true, // El número es obligatorio
    validate: {
      validator: function(v) {
        // Valida el formato: dos o tres dígitos, guion, y el resto dígitos
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: props => `${props.value} no es un número de teléfono válido!`
    }
  }
});

// Exportamos el modelo para usarlo en otros archivos
module.exports = mongoose.model('Person', personSchema);