const db = require('../models');
const jwt = require('jsonwebtoken');

const signToken = user => {
  let { _id, username, biography, profileImageUrl, phoneNumber } = user;
  let token = jwt.sign(
    {
      _id,
      username,
      biography,
      profileImageUrl,
      phoneNumber
    },
    process.env.SECRET_KEY
  );
  return {
    _id,
    username,
    biography,
    profileImageUrl,
    phoneNumber,
    token
  };
};

exports.signup = async function(req, res, next) {
  try {
    if (req.body.groupPassword !== process.env.GROUP_PWD) {
      return next({
        status: 400,
        message: 'Invalid group password.'
      });
    }
    let user = await db.User.create(req.body);
    let tokenPayload = signToken(user);
    return res.status(200).json(tokenPayload);
  } catch (err) {
    if (err.code === 11000) {
      err.message = 'Sorry, that username/email/phone number is taken.';
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.signin = async function(req, res, next) {
  try {
    let user = await db.User.findOne({ email: req.body.email });
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let tokenPayload = signToken(user);
      return res.status(200).json(tokenPayload);
    } else {
      return next({
        status: 400,
        message: 'Invalid email/password.'
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: 'Invalid email/password.'
    });
  }
};

exports.updateUser = async function(req, res, next) {
  try {
    let user = await db.User.findById(req.params.id);
    user.username = req.body.username;
    user.biography = req.body.biography;
    user.profileImageUrl = req.body.profileImageUrl;
    user.phoneNumber = req.body.phoneNumber;
    await user.save();
    let tokenPayload = signToken(user);
    return res.status(200).json(tokenPayload);
  } catch (err) {
    if (err.code === 11000) {
      err.message = 'Sorry, that username/email/phone number is taken.';
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.updatePassword = async function(req, res, next) {
  try {
    var user = await db.User.findById(req.params.id);
    // compare old password
    let isUser = await user.comparePassword(req.body.oldPassword);
    if (isUser) {
      // compare new and confirm passwords
      if (req.body.newPassword === req.body.confirmPassword) {
        user.password = req.body.newPassword;
        await user.save();
        return res.status(200).json(user);
      } else {
        return next({
          status: 400,
          message: 'New passwords do not match.'
        });
      }
    } else {
      return next({
        status: 401,
        message: 'Invalid password.'
      });
    }
  } catch (err) {
    return next(err);
  }
};
