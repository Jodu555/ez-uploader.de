const express = require('express');
const controller = require('./controller');
const authManager = require('../../utils/authManager');
const router = express.Router();


//TODO: maybe add a possibllity to get all Folders wich are in a specific!
router.get('/', controller.get); //Returns all folders a user owns
// router.post('/', null); //Created a folder
// router.patch('/:uuid', null); //Updated a particular folder

module.exports = {
    router,
};
