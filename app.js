const express = require('express');
const https = require('https');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Switch Price API');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/get-game-price', (request, response) => {
  var ids = request.query.ids;

  console.log('https://api.ec.nintendo.com/v1/price?country=NL&lang=nl&limit=100&ids=' + ids);

  https.get('https://api.ec.nintendo.com/v1/price?country=NL&lang=nl&limit=100&ids=' + ids, (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      response.status(200).send(data);
    });

  }).on('error', (err) => {
    console.log('Error: ' + err.message);
  });
});
