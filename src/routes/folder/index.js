const express = require('express');
const controller = require('./controller');
const authManager = require('../../utils/authManager');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Folder-Router works just fine' });
});

//TODO: maybe add a possibllity to get all Folders wich are in a specific!
router.get('/', authManager.authentication, controller.get); //Returns all folders a user owns
router.post('/', authManager.authentication, null); //Created a folder
router.patch('/:uuid', authManager.authentication, null); //Updated a particular folder

module.exports = {
    router,
};
