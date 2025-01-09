const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// URL de la hoja publicada en formato JSON
const SHEET_URL = 'https://spreadsheets.google.com/feeds/list/1OiVvWalmpYk7MMZURuVSEMwJv03VFvS4sRSnOO3uI2M/1/public/values?alt=json';

// Función para obtener el catálogo
async function obtenerCatalogo() {
    try {
        const response = await axios.get(SHEET_URL);
        const data = response.data.feed.entry;

        // Formatear los datos
        const catalogo = data.map(entry => ({
            id: parseInt(entry.gsx$id.$t),
            producto: entry.gsx$producto.$t,
            descripcion: entry.gsx$descripcion.$t,
            precio: parseFloat(entry.gsx$precio.$t)
        }));

        return catalogo;
    } catch (error) {
        console.error('Detalles del error:', error.response?.data || error.message);
        throw new Error('No se pudo obtener el catálogo');
    }
}


// Ruta principal
app.get('/catalogo', async (req, res) => {
    try {
        const catalogo = await obtenerCatalogo();
        res.json({ catalogo });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el catálogo' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
