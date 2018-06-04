require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const errorHandler = require('./handlers/error');
const db = require('./models');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const usersRoutes = require('./routes/users');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use(
  '/api/users/:id/messages',
  loginRequired,
  ensureCorrectUser,
  messagesRoutes
);
app.use('/api/users', loginRequired, usersRoutes);

app.get('/api/messages', loginRequired, async function(req, res, next) {
  try {
    let messages = await db.Message.find()
      .sort({ createdAt: 'desc' })
      .populate('user', {
        username: true,
        biography: true,
        profileImageUrl: true
      });
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
});

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function() {
  console.log(`Serving warbler app on port ${PORT}`);
});
