const express = require('express');
const app = express();
app.use(express.json());

let libros = [
  { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez" },
  { id: 2, titulo: "1984", autor: "George Orwell" }
];

// 1. GET /libros
app.get('/libros', (req, res) => {
  const { autor } = req.query;
  if (autor) {
    const filtrados = libros.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
    return res.json(filtrados);
  }
  res.json(libros);
});

// 2. GET /libros/:id
app.get('/libros/:id', (req, res) => {
  const libro = libros.find(l => l.id == req.params.id);
  if (!libro) return res.status(404).json({ mensaje: "Libro no encontrado" });
  res.json(libro);
});

// 3. POST /libros
app.post('/libros', (req, res) => {
  const { titulo, autor } = req.body;
  if (!titulo || !autor) return res.status(400).json({ mensaje: "Título y autor son obligatorios" });

  const nuevo = { id: libros.length + 1, titulo, autor };
  libros.push(nuevo);
  res.status(201).json(nuevo);
});

// 4. PUT /libros/:id
app.put('/libros/:id', (req, res) => {
  const libro = libros.find(l => l.id == req.params.id);
  if (!libro) return res.status(404).json({ mensaje: "Libro no encontrado" });

  const { titulo, autor } = req.body;
  if (titulo) libro.titulo = titulo;
  if (autor) libro.autor = autor;

  res.json(libro);
});

// 5. DELETE /libros/:id
app.delete('/libros/:id', (req, res) => {
  const index = libros.findIndex(l => l.id == req.params.id);
  if (index === -1) return res.status(404).json({ mensaje: "Libro no encontrado" });

  libros.splice(index, 1);
  res.json({ mensaje: "Libro eliminado" });
});

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
