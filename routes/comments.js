const express = require('express');
const router = express.Router();

const { commentsController } = require('../controller');

//Create
router.post('/create', commentsController.create.post);

module.exports = router;
