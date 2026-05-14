const express = require('express');
const path = require('path');
const fetch = global.fetch || require('node-fetch');

const app = express();
const apiBaseUrl = process.env.API_BASE_URL || 'http://topics-api:5000/api/classes';
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/api/classes', async (req, res) => {
  try {
    const response = await fetch(apiBaseUrl);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error proxying API request:', error);
    res.status(502).json({ ok: false, message: 'Error al conectar con el backend' });
  }
});

app.listen(port, () => {
  console.log(`Frontend server escuchando en http://localhost:${port}`);
  console.log(`Backend API base URL: ${apiBaseUrl}`);
});
