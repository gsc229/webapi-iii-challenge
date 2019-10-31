const express = require('express');
const Users = require('../users/userDb');
const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts()
  res.status(200).json();
});

router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users)
    })

  console.log('userRouter .get /')
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
  console.log(req.user);



});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware
// MOVED TO API VALIDATION MIDDLEWARE
function validateUserId(req, res, next) {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ message: "You don't have a user ID." })
  }
  if (isNaN(userId)) {
    return res.status(400).json({ message: "That user id is invalid" })
  }

  Users.getById(userId)

    .then(user => {
      if (!user) {
        res.status(404).json({ message: "No user with that ID" })
      } else {
        console.log(user);
        req.user = user;
        next();
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not retrieve user's information" })
    })

};

function validateUser(req, res, next) {
  console.log("YOU MADE IT TO USER VALIDATOR!");

};

function validatePost(req, res, next) {

};

module.exports = router;
