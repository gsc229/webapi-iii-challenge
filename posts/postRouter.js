const express = require('express');
const Post = require('./postDb');
const User = require('../users/userDb');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: "testing" })
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;