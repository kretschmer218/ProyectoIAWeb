// server/server.js
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const DB_PATH = path.join(__dirname, 'database.sqlite');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// --- Database init ---
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) console.error("DB err:", err);
  else console.log("Connected to SQLite DB:", DB_PATH);
});

// Run schema if not exists (simple approach)
const fs = require('fs');
const schemaPath = path.join(__dirname, 'db', 'schema.sql');
if (fs.existsSync(schemaPath)) {
  const schema = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schema, (err) => {
    if (err) console.error("Error running schema:", err);
    else console.log("Schema ensured.");
  });
}

// --- REST API: Courses ---
app.get('/api/courses', (req, res) => {
  db.all('SELECT * FROM courses ORDER BY id', [], (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});

// --- REST API: Students CRUD ---
app.get('/api/students', (req, res) => {
  const course = req.query.course;
  let q = 'SELECT s.*, c.name as course_name FROM students s LEFT JOIN courses c ON s.course_id=c.id';
  const params = [];
  if (course) {
    q += ' WHERE c.name = ?';
    params.push(course);
  }
  db.all(q + ' ORDER BY s.id', params, (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});

app.get('/api/students/:id', (req, res) => {
  db.get('SELECT * FROM students WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({error: err.message});
    if (!row) return res.status(404).json({error: 'Alumno no encontrado'});
    res.json(row);
  });
});

app.post('/api/students', (req, res) => {
  const {name, email, age, course_id} = req.body;
  // server-side validation simple
  if (!name || !email || !course_id) return res.status(400).json({error: 'Faltan campos obligatorios'});
  const stmt = db.prepare('INSERT INTO students (name, email, age, course_id) VALUES (?, ?, ?, ?)');
  stmt.run([name, email, age || null, course_id], function(err) {
    if (err) return res.status(500).json({error: err.message});
    res.status(201).json({id: this.lastID});
  });
});

app.put('/api/students/:id', (req, res) => {
  const {name, email, age, course_id} = req.body;
  db.run(
    'UPDATE students SET name=?, email=?, age=?, course_id=? WHERE id=?',
    [name, email, age||null, course_id, req.params.id],
    function(err) {
      if (err) return res.status(500).json({error: err.message});
      if (this.changes === 0) return res.status(404).json({error: 'Alumno no encontrado'});
      res.json({updated: true});
    }
  );
});

app.delete('/api/students/:id', (req, res) => {
  db.run('DELETE FROM students WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({error: err.message});
    if (this.changes === 0) return res.status(404).json({error: 'Alumno no encontrado'});
    res.json({deleted: true});
  });
});

// --- Simple IA demo endpoint (simulación) ---
app.post('/api/ia-demo', (req, res) => {
  // recibe { prompt: "..."}
  const prompt = req.body.prompt || '';
  // Simulación: respuesta simple que demuestra uso de IA generativa sin llamar a APIs externas.
  const response = `Simulación IA: recibí tu prompt (${prompt.slice(0,120)}...). Sugerencia: intenta pedir "Generar código JS para validar un formulario".`;
  res.json({result: response});
});

// --- Weather proxy (opcional) ---
// If you want a server-side proxy to hide API key, you can implement here.

// Serve frontend (fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
