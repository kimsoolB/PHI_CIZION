const express = require('express');
const router = express.Router();

const { usersController } = require('../../controller');

//POST login
router.post('/', usersController.login.post);

module.exports = router;
