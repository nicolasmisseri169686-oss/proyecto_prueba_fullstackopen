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

// ---------------- BASE DE DATOS EN MEMORIA (Temporal) ----------------
// ATENCIÓN: Esta es una solución solo para desarrollo.
// Los datos se perderán cuando el servidor se reinicie.
// Para producción, DEBES usar una base de datos real como MongoDB.

let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
];

// ---------------- RUTAS DE LA API (RESTful) ----------------

// GET /api/persons - Obtiene todas las entradas de la agenda
app.get("/api/persons", (req, res) => {
  res.json(persons); // Devuelve el array completo de personas en formato JSON
});

// GET /info - Muestra información general (cantidad de registros + fecha actual)
app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`);
});

// GET /api/persons/:id - Obtiene una persona específica por su ID
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id); // Convierte el parámetro de string a número
  const person = persons.find((p) => p.id === id); // Busca la persona por ID
  
  if (person) {
    res.json(person); // Si la encuentra, la devuelve
  } else {
    res.status(404).end(); // Si no la encuentra, devuelve error 404 Not Found
  }
});

// DELETE /api/persons/:id - Elimina una persona por su ID
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id); // Filtra el array, removiendo la persona con el ID especificado
  res.status(204).end(); // Responde con 204 No Content (éxito pero sin contenido para devolver)
});

// POST /api/persons - Crea una nueva entrada en la agenda
app.post("/api/persons", (req, res) => {
  const body = req.body; // Los datos vienen en el cuerpo de la request

  // Validaciones de los datos recibidos
  if (!body.name) {
    return res.status(400).json({ error: "name missing" }); // 400 Bad Request
  }
  if (!body.number) {
    return res.status(400).json({ error: "number missing" });
  }
  if (persons.some((p) => p.name === body.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  // Generación de un ID aleatorio (solución temporal)
  const id = Math.floor(Math.random() * 1000000);
  
  // Creación del nuevo objeto persona
  const person = { 
    id, 
    name: body.name, 
    number: body.number 
  };

  // Agrega la nueva persona al array
  persons = persons.concat(person);
  
  // Devuelve la nueva persona creada con código 200 OK
  res.json(person);
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

// Define el puerto: usa el puerto de la variable de entorno PORT o el 3001 por defecto
// Las plataformas de despliegue (Render, Heroku, etc.) automatically set the PORT environment variable
const PORT = process.env.PORT || 3001;

// Pone el servidor a escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});