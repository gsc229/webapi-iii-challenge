const express = require('express');
const Users = require('../users/userDb');
const Posts = require('../posts/postDb');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(newUser => {
      res.status(200).json(newUser);
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  Posts.insert(req.body)
    .then(post => {
      res.status(200).json(post);
    })

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

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.user.id)
    .then(posts => {
      res.status(200).json(posts);
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.user.id)
    .then(respone => {
      res.status(200).json(respone);
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  console.log("req.user", req.user);
  Users.update(req.user.id, req.body)
    .then(changes => {
      res.status(200).json(changes);
    })
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
        console.log("validateUser .getById user", user);
        req.user = user;
        next();
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not retrieve user's information" })
    })

};

function validateUser(req, res, next) {

  if (!req.body) {
    return res.status(400).json({ message: "Your request needs a body." })
  }
  if (!req.body.name) {
    return res.status(400).json({ message: "Your request is missing a name: 'name'" });
  }
  next();
  console.log("validateUser req.body", req.body);

};

function validatePost(req, res, next) {
  if (!req.body) {
    return res.status(400).json({ message: "missing post data" })
  }
  if (!req.body.text) {
    return res.status(400).json({ message: "missing required text field" });
  }
  next();

  console.log("validatePost req.body", req.body)
};

module.exports = router;
