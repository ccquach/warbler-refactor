const express = require('express');
const router = express.Router({ mergeParams: true });
const { signup, signin, updateUser } = require('../handlers/auth');

router.post('/signup', signup);
router.post('/signin', signin);
router.put('/:id', updateUser);

module.exports = router;
