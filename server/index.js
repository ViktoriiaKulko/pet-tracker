const express = require('express');
const morgan = require('morgan');

const PORT = 8000;
const app = express()
  // log more info to the console
  .use(morgan('tiny'))
  .use(express.json())

  // any requests for static files will go into the public folder
  .use(express.static('public'))

  // endpoints
  .get('/hello', (req, res) => {
    res.send('Hello world');
  })

  // catch all endpoint
  .get('*', (req, res) => {
    res.status(404).json({
      status: 404,
      message: 'This is obviously not what you are looking for.',
    });
  });

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
