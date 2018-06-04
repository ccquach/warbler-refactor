const express = require('express');
const router = express.Router();
const { getUserByUsername } = require('../handlers/users');

router.get('/:username', getUserByUsername);

module.exports = router;
