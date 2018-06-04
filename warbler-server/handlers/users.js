const db = require('../models');
const sanitize = require('sanitize-html');

exports.getUserByUsername = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      username: sanitize(req.params.username)
    });
    let { _id, username, biography, profileImageUrl } = user;
    return res.status(200).json({
      _id,
      username,
      biography,
      profileImageUrl
    });
  } catch (err) {
    return next({
      status: 400,
      message: 'User does not exist.'
    });
  }
};
