# Proyecto Fullstack Open

Este proyecto contiene varias partes desarrolladas durante el curso Fullstack Open. Cada carpeta representa una sección o ejercicio diferente del curso.

## Estructura del proyecto

- **part1/**: Ejercicios y ejemplos introductorios de React, configuración inicial con Vite, componentes básicos y manejo de estado.
- **part2/**: Ejercicios avanzados de React, manejo de listas, formularios, filtrado y consumo de APIs externas (por ejemplo, información de países y clima). Incluye subcarpetas como `countries/` y `my-app/` con implementaciones específicas.
    - **countries/**: Aplicación para buscar países, ver detalles y consultar el clima de la capital.
    - **my-app/**: Ejercicios adicionales de React, manejo de componentes y estilos.
- **part3/**: Ejercicios de backend con Node.js y Express. Incluye la implementación de una API para una agenda telefónica (phonebook).
    - **phonebook/**: Aplicación de agenda telefónica, frontend en React y backend en Node.js. Permite agregar, eliminar, filtrar y modificar contactos. Incluye servicios para interactuar con la API y una base de datos local (`db.json`).

## Cómo ejecutar cada parte

1. Entra a la carpeta de la parte que quieras probar (por ejemplo, `cd part1`).
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación:
   ```bash
   npm run dev
   ```

Para el backend (`part3/phonebook`):
1. Entra a la carpeta `part3/phonebook`.
2. Instala dependencias y ejecuta el servidor:
   ```bash
   npm install
   npm run dev
   ```

## Notas
- Cada carpeta tiene su propio `package.json` y configuración.
- Puedes trabajar cada parte de forma independiente.
- Revisa los archivos `README.md` dentro de cada subcarpeta para detalles específicos.

---

Este repositorio es parte de los ejercicios del curso [Fullstack Open](https://fullstackopen.com/).