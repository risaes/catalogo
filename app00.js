// Importar las dependencias necesarias
const express = require('express');
const axios = require('axios');
const csv = require('csv-parser');

const app = express();
const PORT = 3000;

// URL del CSV publicado desde Google Sheets
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT7nKis6dgDy7NKgIhODRTE4xO2ZDmkvCvcVXnOR3UGsoRQ1aXk2N3aA34WfHFGBDmeHoabP0jWZ18I/pub?output=csv';

// Endpoint para obtener el catálogo
app.get('/catalogo', (req, res) => {
    const catalogo = [
        { id: 1, producto: 'Laptop', descripcion: 'Laptop de 14"', precio: 500 },
        { id: 2, producto: 'Smartphone', descripcion: 'Smartphone 5G', precio: 300 }
    ];
    res.json({ catalogo });
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
