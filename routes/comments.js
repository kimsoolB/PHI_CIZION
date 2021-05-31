const express = require('express');
const router = express.Router();

const { commentsController } = require('../controller');

//Create
router.post('/create', commentsController.create.post);

//Delete
router.put('/delete', commentsController.delete.put);

module.exports = router;
