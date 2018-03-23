'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Note = require('../models/note');

router.get('/', (req, res, next) => {
  const { searchTerm, folderId, tagId } = req.query;

  let filter = {};

  if (searchTerm) {
    const re = new RegExp(searchTerm, 'i');
    filter.title = { $regex: re };
  }

  if (folderId) {
    filter.folderId = folderId;
  }

  if (tagId) {
    filter.tags = tagId;
  }

  Note.find(filter)
    .sort('created')
    .then(results => {
      console.log(results);
      // res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;