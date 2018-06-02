const db = require('../models');
const sanitize = require('sanitize-html');
const { sendSMS } = require('./sms');

exports.createMessage = async function(req, res, next) {
  try {
    // create message
    let sanitizedText = sanitize(req.body.text);
    let message = await db.Message.create({
      text: sanitizedText,
      user: req.params.id
    });
    // save to user
    let foundUser = await db.User.findById(req.params.id);
    foundUser.messages.push(message._id);
    await foundUser.save();
    // return new message
    let foundMessage = await db.Message.findById(message._id).populate('user', {
      username: true,
      biography: true,
      profileImageUrl: true
    });
    // send sms
    sendSMS(foundMessage);
    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};

exports.getMessage = async function(req, res, next) {
  try {
    let message = await db.Message.findById(req.params.message_id);
    return res.status(200).json(message);
  } catch (err) {
    return next(err);
  }
};

exports.deleteMessage = async function(req, res, next) {
  try {
    let foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove();
    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};
