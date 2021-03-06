const express = require('express');
const { v4 } = require('uuid');
const router = express.Router();
const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();
const authManager = require('../../utils/authManager');
const path = require('path');

router.get('/:UUID', (req, res, next) => {
    try {
        const UUID = req.params.UUID
        //TODO: here comes the point on share public etc.
        //TODO: Here comes also the extension choose hin (png, jpg)
        if (authManager.getUser(req.query.key)) {
            const imagePath = path.join(__dirname, '../../../upload', UUID + '.png');
            res.sendFile(imagePath);
        } else {
            next(new Error('Unauthorized!'));
        }
    } catch (error) {
        next(error);
    }
})


module.exports = { router };