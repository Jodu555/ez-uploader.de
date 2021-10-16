const express = require('express');
const controller = require('./controller');
const authManager = require('../../utils/authManager');
const router = express.Router();

router.get('/', controller.get); // Returns all the entrys a user owns

module.exports = {
    router,
};
