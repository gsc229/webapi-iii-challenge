
/* Custom middleware for userRouter */
module.exports = {
  validateUserId,
  validateUser,
  validatePost,
  validatePostId
}



function validateUserId(req, res, next) {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ message: "You don't have a user ID." })
  }

  Users.getById(userId)
    .then(user => {
      console.log(user)
      if (!user) {

      }
    })



};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};


/* ==================================== */
/* custom middleware for postRouter */
function validatePostId(req, res, next) {

};