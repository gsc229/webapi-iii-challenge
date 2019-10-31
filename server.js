const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const validateUserId = require('./api/validation-middleware');
const validateUser = require('./api/validation-middleware');
const validatePost = require('./api/validation-middleware');
const validatePostId = require('./api/validation-middleware')


const server = express();

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

//global middleware 
server.use(helmet());
server.use(express.json());
//custom middleware
server.use(morgan('dev'));
function logger(prefix) {
  return (req, res, next) => {
    console.log(
      `${prefix} [${new Date().toISOString()}] ${req.method} to ${req.originalUrl}`
    );

    next();
  };
};

server.use('/api/users', logger('Logger for users: '), userRouter);
server.use('/api/posts', logger('Logger for posts: '), postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports = server;
