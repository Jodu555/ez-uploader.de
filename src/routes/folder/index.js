const express = require('express');
const controller = require('./controller');
const authManager = require('../../utils/authManager');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Folder-Router works just fine' });
});

router.get('/', authManager.authentication, null); //Returns all folders a user owns
router.post('/', authManager.authentication, null); //Created a folder
router.patch('/:uuid', authManager.authentication, null); //Updated a particular folder

module.exports = {
    router,
};
