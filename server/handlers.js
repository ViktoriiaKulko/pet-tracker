const assert = require('assert');
const { v4: uuidv4 } = require('uuid');

const { sendResponse } = require('./utils');
const {
  DATA_BASE,
  FOUND_PETS_COLLECTION,
  LOST_PETS_COLLECTION,
  USERS_COLLECTION,
} = require('./variables');

// TODO: add date validation, fix required fields validation,
//       catch errors, don't add action to post data
const addPosting = async (req, res) => {
  const { userName, userEmail, action } = req.body;

  // validate required fields
  const requiredFields = ['date', 'address', 'species', 'images'];
  const emptyRequiredFields = requiredFields.filter(
    (field) => !req.body[field]
  );
  const message = `Fields are required: ${emptyRequiredFields.join(', ')}.`;

  if (emptyRequiredFields.length) {
    sendResponse({
      res,
      status: 400,
      data: emptyRequiredFields,
      message,
    });
    return;
  }

  try {
    const client = req.app.locals.client;
    const db = client.db(DATA_BASE);

    // add a new posting
    const collection =
      action === 'found' ? FOUND_PETS_COLLECTION : LOST_PETS_COLLECTION;
    const _id = uuidv4();

    const result = await db
      .collection(collection)
      .insertOne({ ...req.body, _id });

    assert.equal(
      _id,
      result.insertedId,
      'Duplicate key error: posting with this _id already exists.'
    );

    // check if the user exists
    const currentUser = await db
      .collection(USERS_COLLECTION)
      .findOne({ email: userEmail });

    if (currentUser) {
      // update the user's info
      const updatedData =
        action === 'found'
          ? { foundPets: [...currentUser.foundPets, _id] }
          : { lostPets: [...currentUser.lostPets, _id] };

      await db
        .collection(USERS_COLLECTION)
        .updateOne({ email: userEmail }, { $set: { ...updatedData } });
    } else {
      // add a new user
      let userData = { name: userName, email: userEmail };
      userData =
        action === 'found'
          ? { ...userData, lostPets: [], foundPets: [_id] }
          : { ...userData, lostPets: [_id], foundPets: [] };

      await db.collection(USERS_COLLECTION).insertOne({ ...userData });
    }

    sendResponse({
      res,
      status: 201,
      data: { _id, ...req.body },
      message: 'Posting was added.',
    });
  } catch (err) {
    sendResponse({ res, status: 500, message: err.message });
  }
};

const getLostPets = async (req, res) => {
  try {
    const client = req.app.locals.client;
    const db = client.db(DATA_BASE);
    const postings = await db.collection(LOST_PETS_COLLECTION).find().toArray();
    sendResponse({ res, status: 200, data: postings });
  } catch (err) {
    sendResponse({ res, status: 500, message: err.message });
  }
};

const getFoundPets = async (req, res) => {
  try {
    const client = req.app.locals.client;
    const db = client.db(DATA_BASE);
    const postings = await db
      .collection(FOUND_PETS_COLLECTION)
      .find()
      .toArray();
    sendResponse({ res, status: 200, data: postings });
  } catch (err) {
    sendResponse({ res, status: 500, message: err.message });
  }
};

const getLostPet = async (req, res) => {
  const { _id } = req.params;

  try {
    const client = req.app.locals.client;
    const db = client.db(DATA_BASE);
    const pet = await db.collection(LOST_PETS_COLLECTION).findOne({ _id });

    if (pet) {
      sendResponse({ res, status: 200, data: pet });
    } else {
      sendResponse({
        res,
        status: 404,
        data: _id,
        message: 'The pet not found',
      });
    }
  } catch (error) {}
};

const getFoundPet = async (req, res) => {
  const { _id } = req.params;

  try {
    const client = req.app.locals.client;
    const db = client.db(DATA_BASE);
    const pet = await db.collection(FOUND_PETS_COLLECTION).findOne({ _id });

    if (pet) {
      sendResponse({ res, status: 200, data: pet });
    } else {
      sendResponse({
        res,
        status: 404,
        data: _id,
        message: 'The pet not found',
      });
    }
  } catch (error) {}
};

const getUser = async (req, res) => {
  const { _id } = req.params;

  try {
    const client = req.app.locals.client;
    const db = client.db(DATA_BASE);
    const user = await db.collection(USERS_COLLECTION).findOne({ _id });

    if (user) {
      sendResponse({ res, status: 200, data: user });
    } else {
      sendResponse({
        res,
        status: 404,
        data: _id,
        message: 'The user not found',
      });
    }
  } catch (error) {
    sendResponse({ res, status: 500, message: err.message });
  }
};

module.exports = {
  addPosting,
  getLostPets,
  getFoundPets,
  getLostPet,
  getFoundPet,
  getUser,
};
