const express = require('express');

const server = express();

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

//global middleware 
server.use(express.json());
//custom middleware

function logger(req, res, next) {
  return (req, res, next) => {
    console.log(
      `${prefix} [${new Date().toISOString()}] ${req.method} to ${req.url}`
    );

    next();
  };
};

server.use('api/user', logger('Logger for user: '), userRouter);
server.use('api/post', logger('Logger for post: '), postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports = server;
