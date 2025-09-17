import axios from "axios";

// URL base condicional
// import.meta.env.MODE es una variable de entorno de Vite
// import.meta.env.DEV también funciona (es true en desarrollo)
const baseURL = import.meta.env.MODE === 'development'
  ? 'https://phonebook-backend-hmsj.onrender.com/api/persons' // ← URL de tu backend EN RENDER
  : 'http://localhost:3001/api/persons'

// frontend/src/services/persons.js
const getAll = () => {
  console.log('Haciendo GET a:', baseURL); // <-- Agrega esta línea
  return axios.get(baseURL)
    .then((response) => {
      console.log('Respuesta recibida:', response); // <-- Agrega esta línea
      console.log('Datos recibidos:', response.data); // <-- Agrega esta línea
      console.log('Tipo de datos:', typeof response.data, Array.isArray(response.data)); // <-- Agrega esta línea
      return response.data;
    })
    .catch((error) => {
      console.error('Error en GET:', error); // <-- Agrega esta línea
      throw error; // Vuelve a lanzar el error para que App.jsx lo capture
    });
};

const create = (newObject) => {
  return axios.post(baseURL, newObject).then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseURL}/${id}`).then((response) => response.data);
};

const update = (id, updateObject) => {
  return axios
    .put(`${baseURL}/${id}`, updateObject)
    .then((response) => response.data);
};
export default { getAll, create, remove, update };
