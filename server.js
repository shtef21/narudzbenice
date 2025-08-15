const express = require('express');
const path = require('path');
const { JSDOM } = require('jsdom');

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
    const oib = req.query.oib;
    const dataUrl = `https://infobiz.fina.hr/tvrtka/-/OIB-${oib}`;
    console.log(`Dohvaćanje podataka za ${oib}`);
    const html = await fetch(dataUrl).then(res => res.text());
    console.log('Dohvaćeno.');
    
    const dom = new JSDOM(html);
    const document = dom.window.document;
    // Find the div whose text starts with "Naziv:"
    const itemDiv = [...document.querySelectorAll('.item-fina-public > div')]
      .filter(el => el.textContent.trim().startsWith('Naziv:'))[0];
    // Get the second child if the element exists
    const name = itemDiv && itemDiv.children[1] ? itemDiv.children[1].textContent.trim() : 'Element not found';

    res.json({ oib, name });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
