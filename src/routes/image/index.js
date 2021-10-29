const express = require('express');
const { v4 } = require('uuid');
const router = express.Router();
const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();
const authManager = require('../../utils/authManager');
const path = require('path');

router.get('/:UUID', (req, res, next) => {
    const UUID = req.params.UUID
    //Check if user has this key
    console.log(UUID);
    console.log(req.query.key);
    if (authManager.getUser(req.query.key)) {
        const imagePath = path.join(__dirname, '../../../upload', UUID + '.png');
        console.log(imagePath);
        res.sendFile(imagePath);
    }

    console.log('Image Request');
})


module.exports = { router };