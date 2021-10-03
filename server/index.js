const express = require('express');
const { MongoClient } = require('mongodb');
const morgan = require('morgan');

const {
  addPosting,
  getLostPets,
  getFoundPets,
  getLostPet,
  getFoundPet,
  getUser,
} = require('./handlers');

require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const PORT = 8000;
const app = express()
  // log more info to the console
  .use(morgan('tiny'))
  .use(express.json())

  // any requests for static files will go into the public folder
  .use(express.static('public'))

  // endpoints
  .post('/postings', addPosting)
  .get('/postings/lost', getLostPets)
  .get('/postings/found', getFoundPets)
  .get('/postings/lost/:_id', getLostPet)
  .get('/postings/found/:_id', getFoundPet)
  .get('/user/:_id', getUser)

  // catch all endpoint
  .get('*', (req, res) => {
    res.status(404).json({
      status: 404,
      message: 'This is obviously not what you are looking for.',
    });
  });

const setup = async () => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  app.locals.client = client;
};

setup()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error: ', err);
  });
