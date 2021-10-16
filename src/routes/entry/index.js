const express = require('express');
const controller = require('./controller');
const authManager = require('../../utils/authManager');
const router = express.Router();

router.get('/', controller.get); // Returns all the entrys a user owns
router.get('/:folderUUID', controller.getFromFolder); // Returns all the entrys a user owns from a specific folder

module.exports = {
    router,
};
