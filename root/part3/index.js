// Importación de módulos necesarios
const express = require("express"); // Framework web para Node.js
const morgan = require("morgan"); // Middleware para logging de requests
const path = require("path"); // Módulo para trabajar con rutas de archivos y directorios
const cors = require("cors"); // Middleware para habilitar CORS (Cross-Origin Resource Sharing)

// Inicialización de la aplicación Express
const app = express();

// ---------------- MIDDLEWARES (Software intermedio) ----------------
// Los middlewares se ejecutan en el orden en que se definen

app.use(cors()); // Habilita CORS: permite que el frontend (en localhost:5173) se comunique con este backend
app.use(express.json()); // Parsea (interpreta) los cuerpos de las requests con formato JSON y los pone disponibles en req.body

// Configuración de Morgan para logging personalizado
// Creamos un token personalizado que muestra el body de las requests POST y PUT
morgan.token("body", (req) => {
  return req.method === "POST" || req.method === "PUT"
    ? JSON.stringify(req.body)
    : "";
});

// Usamos Morgan con el formato personalizado que incluye nuestro token "body"
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

// ---------------- CONEXIÓN A MONGODB ----------------
// Conexión a la base de datos (reemplaza la URI por la tuya en .env)
const mongoose = require("mongoose"); // ORM para MongoDB
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/phonebook';
mongoose.connect(url)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error de conexión:', error.message));

// Importa el modelo Person definido con validaciones
const Person = require('./models/person');

// ---------------- RUTAS DE LA API (RESTful) ----------------

// GET /api/persons - Obtiene todas las personas desde MongoDB
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch(error => next(error));
});

// GET /info - Muestra información general (cantidad de registros + fecha actual)
app.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then(count => {
      const date = new Date();
      res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
    })
    .catch(error => next(error));
});

// GET /api/persons/:id - Obtiene una persona específica por su ID
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

// DELETE /api/persons/:id - Elimina una persona por su ID
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error));
});

// POST /api/persons - Crea una nueva entrada en la agenda
app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(error => next(error)); // Pasa el error al middleware de manejo de errores
});

// ---------------- SERVIR APLICACIÓN FRONTEND (React/Vue/etc) ----------------

// Sirve archivos estáticos (HTML, CSS, JS, imágenes) desde la carpeta "dist"
// Esta carpeta se crea cuando haces "npm run build" en tu frontend
app.use(express.static(path.join(__dirname, "dist")));

// Manejo de rutas para Single Page Application (SPA)
// Para cualquier ruta que no sea /api*, devuelve el index.html
// Esto permite que React Router maneje la navegación en el frontend
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ---------------- INICIO DEL SERVIDOR ----------------

// ---------------- MANEJO DE ERRORES DE VALIDACIÓN ----------------
// Middleware para manejar errores de Mongoose (validación, cast, etc.)
app.use((error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' });
  }
  next(error);
});

// ---------------- INICIO DEL SERVIDOR ----------------
const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; // ← IMPORTANTE para testing

/* Eliminado código duplicado de conexión a mongoose y declaración de Person */