const express = require('express');
const xlsx = require('xlsx');
const app = express();
const port = 3000;

// Ruta para obtener el catálogo
app.get('/catalogo', (req, res) => {
  try {
    // Cargar el archivo Excel
    const workbook = xlsx.readFile('catalogo.xlsx');

    // Leer la primera hoja
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convertir los datos de la hoja a formato JSON
    const data = xlsx.utils.sheet_to_json(sheet);

    res.json({ catalogo: data });
  } catch (error) {
    console.error('Error al leer el archivo Excel:', error);
    res.status(500).json({ error: 'Error al obtener el catálogo' });
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
