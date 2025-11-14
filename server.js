import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir carpeta public (CSS, JS, imágenes, HTML estáticos)
app.use(express.static(path.join(__dirname, "public")));

// --------------------------
// SERVIR HTML DESDE /PUBLIC
// --------------------------
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));  // <-- CAMBIAR AQUÍ
});

app.get("/cargar-alumno", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "cargar-alumno.html"));  // <-- CAMBIAR AQUÍ
});

app.get("/alumnos", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "alumnos.html"));  // <-- CAMBIAR AQUÍ
});

app.get("/historia", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "historia.html"));  // <-- CAMBIAR AQUÍ
});

app.get("/unidad6", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "unidad6.html"));  // <-- CAMBIAR AQUÍ
});

// Endpoint de clima
app.get("/api/clima", async (req, res) => {
    const ciudad = req.query.ciudad;

    if (!ciudad) {
        return res.status(400).json({ error: "Falta el parámetro ciudad." });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${process.env.API_KEY}&units=metric&lang=es`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        res.json(datos);
    } catch (error) {
        res.status(500).json({ error: "Error consultando la API externa" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
