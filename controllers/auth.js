require("dotenv");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError} = require("../errors/index");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const {password,email} = req.body
  if(!password || !email) {
    return new BadRequestError('Please provide email or password')
  }
  const user = await User.findOne({email});
  
  if(!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  // compare password
  const isPasswordCorrect = await user.comparePassword(password)
  if(!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const token = user.createJWT();
  return res.status(StatusCodes.OK).json({user : {name : user.name}, token});


};

module.exports = {
  register,
  login,
};
