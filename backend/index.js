import express from 'express';

const app = express();
const port = 3000; 

app.use(express.json());

let libros1 = [
  { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez' },
  { id: 2, titulo: '1984', autor: 'George Orwell' }
];

let libros2 = [
  { id: 1, titulo: 'Rayuela', autor: 'Julio Cortázar' },
  { id: 2, titulo: 'El nombre del viento', autor: 'Patrick Rothfuss' }
];

let libros3 = [
  { id: 1, titulo: 'Los miserables', autor: 'Victor Hugo' },
  { id: 2, titulo: 'El principito', autor: 'Antoine de Saint-Exupéry' },
  { id: 3, titulo: 'Crimen y castigo', autor: 'Fiódor Dostoyevski' },
  { id: 4, titulo: 'Fahrenheit 451', autor: 'Ray Bradbury' }
];

let libros4 = [
  { id: 1, titulo: 'Orgullo y prejuicio', autor: 'Jane Austen' },
  { id: 2, titulo: 'La sombra del viento', autor: 'Carlos Ruiz Zafón' },
  { id: 3, titulo: 'Matar a un ruiseñor', autor: 'Harper Lee' },
  { id: 4, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes' }
];

let libros5 = [
  { id: 1, titulo: 'Fundación', autor: 'Isaac Asimov' },
  { id: 2, titulo: 'Neuromante', autor: 'William Gibson' },
  { id: 3, titulo: 'El señor de los anillos', autor: 'J.R.R. Tolkien' },
  { id: 4, titulo: 'Dune', autor: 'Frank Herbert' }
];

// GET /libros1 - Buscar por autor o mostrar todos
app.get('/libros1', (req, res) => {
  const autor = req.query.autor;
  const data = libros1;
  if (autor) {
    const filtrados = data.filter(libro =>
      libro.autor.toLowerCase().includes(autor.toLowerCase())
    );
    return res.json(filtrados);
  }
  res.json(data);
});

// GET /libros2/:id - Obtener libro por ID
app.get('/libros2/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros2.find(libro => libro.id === id);
  if (!libro) return res.status(404).send('Libro no encontrado');
  res.json(libro);
});

// POST /libros3 - Agregar nuevo libro
app.post('/libros3', (req, res) => {
  const { titulo, autor } = req.body;
  if (!titulo || !autor) return res.status(400).send('Faltan datos');
  const nuevoLibro = { id: libros3.length + 1, titulo, autor };
  libros3.push(nuevoLibro);
  res.status(201).json(nuevoLibro);
});

// PUT /libros4/:id - Actualizar libro
app.put('/libros4/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros4.find(libro => libro.id === id);
  if (!libro) return res.status(404).send('Libro no encontrado');

  const { titulo, autor } = req.body;
  if (titulo) libro.titulo = titulo;
  if (autor) libro.autor = autor;

  res.json(libro);
});

// DELETE /libros5/:id - Eliminar libro
app.delete('/libros5/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = libros5.findIndex(libro => libro.id === id);
  if (index === -1) return res.status(404).send('Libro no encontrado');
  libros5.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});
