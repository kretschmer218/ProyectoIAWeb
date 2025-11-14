# Proyecto IA Web - Institución

## Resumen
Aplicación web educativa que combina un frontend (HTML, Tailwind, JS) con backend en Node.js + SQLite. Incluye: widget de clima, CRUD de alumnos por curso, historia de la institución y Unidad 6 sobre IA Generativa.

## Estructura
(Ver estructura en el repo)

## Requisitos
- Node.js >= 16
- npm
- (Opcional) OpenWeatherMap API key para el widget de clima

## Instalación local
```bash
# desde la raíz
cd server
npm install
# crear DB inicial
node server.js
# opcional: cargar seed
sqlite3 server/database.sqlite < server/db/seed.sql
# iniciar en modo dev
npm run dev
# abre http://localhost:4000
