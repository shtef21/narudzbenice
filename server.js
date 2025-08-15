const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

// Serve static files (bootstrap, JS, CSS, etc.)
app.use(express.static(path.join(__dirname, 'src')));

// Serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// /dohvati-podatke endpoint
app.get('/dohvati-podatke', async (req, res) => {
  try {
    const response = await fetch('https://www.google.com');
    const text = await response.text();
    res.send(text);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
