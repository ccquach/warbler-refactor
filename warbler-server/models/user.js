const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const sanitize = require('sanitize-html');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  biography: {
    type: String,
    maxLength: 160
  },
  profileImageUrl: {
    type: String
  },
  phoneNumber: {
    type: String,
    set: toNumbers,
    set: skipEmpty,
    unique: true,
    sparse: true
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }
  ]
});

function toNumbers(val) {
  if (typeof val !== 'string') val = '';
  return val.replace(/\D+/g, '');
}

function skipEmpty(val) {
  if (val.length === 0) return undefined;
  return val;
}

userSchema.pre('save', async function(next) {
  try {
    // throw error if possible malicious string provided
    this.schema.eachPath(path => {
      if (this[path] && this[path].length && path !== 'messages') {
        if (this[path] !== sanitize(this[path])) {
          let err = new Error('Invalid text input.');
          return next(err);
        }
      }
    });
    // hash password
    if (!this.isModified('password')) return next();
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
