# ProyectoWebService
frontend y backend
# Web Service de Biblioteca con Node.js y Docker

## Endpoints

- `GET /libros` → Retorna todos los libros.
- `GET /libros/:id` → Retorna un libro por ID.
- `POST /libros` → Agrega un nuevo libro. Requiere título y autor.
- `PUT /libros/:id` → Actualiza un libro por ID.
- `DELETE /libros/:id` → Elimina un libro por ID.
- `GET /libros?autor=nombre` → Filtra libros por autor.

## Ejemplos

**GET /libros**

```json
[
  { "id": 1, "titulo": "Cien años de soledad", "autor": "Gabriel García Márquez" },
  { "id": 2, "titulo": "1984", "autor": "George Orwell" }
]
