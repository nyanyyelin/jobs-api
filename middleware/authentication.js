const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");


const auth = (req,res, next) => {
  const authHead = req.headers.authorization;
  if (!authHead || !authHead.startsWith('Bearer ')) {
    throw new UnauthenticatedError("Authorization Invalid!");
  }
  const token = authHead.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user to the job routes
    /*
      // another way of attaching user to the job routes
      const user = User.findById(payload.id).select('-password');
      req.user = user;
    */
    req.user = {userId: payload.userId, name: payload.name}
    next()
  }
  catch(err) {
    throw new UnauthenticatedError('Authorization Invalid!!')
  }
};

module.exports = auth

