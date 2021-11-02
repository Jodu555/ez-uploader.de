const express = require('express');
const controller = require('./controller');
const authManager = require('../../utils/authManager');
const router = express.Router();


router.get('/', controller.get); //Returns all folders a user owns
router.get('/root', controller.getRoot); //Returns the root folder for the user
router.get('/:folderUUID', controller.getFromFolder); // Returns all the folders a user owns from a specific folder
router.post('/', controller.create); //Created a folder
router.patch('/:uuid', controller.update); //Updated a particular folder

module.exports = {
    router,
};
