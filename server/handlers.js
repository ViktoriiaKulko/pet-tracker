const assert = require('assert');
const { log } = require('console');
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

const getPet = async (req, res) => {
  const { _id, action } = req.params;

  try {
    const client = req.app.locals.client;
    const db = client.db(DATA_BASE);
    const collection =
      action === 'found' ? FOUND_PETS_COLLECTION : LOST_PETS_COLLECTION;
    const pet = await db.collection(collection).findOne({ _id });

    if (pet) {
      sendResponse({ res, status: 200, data: pet });
    } else {
      sendResponse({
        res,
        status: 404,
        data: _id,
        message: 'The pet not found.',
      });
    }
  } catch (error) {
    sendResponse({ res, status: 500, message: err.message });
  }
};

const deletePosting = async (req, res) => {
  const { _id, action, email } = req.body;

  try {
    const client = req.app.locals.client;
    const db = client.db(DATA_BASE);

    // update user's data
    const currentUser = await db
      .collection(USERS_COLLECTION)
      .findOne({ email });

    if (currentUser) {
      const { foundPets, lostPets } = currentUser;

      if (action === 'found') {
        foundPets.splice(foundPets.indexOf(_id), 1);
      } else {
        lostPets.splice(lostPets.indexOf(_id), 1);
      }

      const updatedData = action === 'found' ? { foundPets } : { lostPets };
      await db
        .collection(USERS_COLLECTION)
        .updateOne({ email }, { $set: { ...updatedData } });
    }

    // delete posting from db
    const collection =
      action === 'found' ? FOUND_PETS_COLLECTION : LOST_PETS_COLLECTION;
    const result = await db.collection(collection).deleteOne({ _id });
    assert.equal(1, result.deletedCount, 'Posting not found');

    sendResponse({
      res,
      status: 201,
      data: { ...req.body },
      message: 'Posting was removed.',
    });
  } catch (err) {
    sendResponse({ res, status: 500, message: err.message });
  }
};

const getUser = async (req, res) => {
  const { email } = req.params;

  try {
    const client = req.app.locals.client;
    const db = client.db(DATA_BASE);
    const user = await db.collection(USERS_COLLECTION).findOne({ email });

    if (user) {
      sendResponse({ res, status: 200, data: user });
    } else {
      sendResponse({
        res,
        status: 404,
        data: _id,
        message: 'The user not found.',
      });
    }
  } catch (err) {
    sendResponse({ res, status: 500, message: err.message });
  }
};

module.exports = {
  addPosting,
  getLostPets,
  getFoundPets,
  getPet,
  deletePosting,
  getUser,
};
