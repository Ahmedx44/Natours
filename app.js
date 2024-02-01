const express = require('express');

const app = express();

app.get('/', (res, req) => {
  res.statusCode(200).send('hello from the server end');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is runinng in port ${port}...`);
});
