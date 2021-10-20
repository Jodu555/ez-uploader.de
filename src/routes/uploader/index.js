const express = require('express');
const multer = require('multer');
const { v4 } = require('uuid');
const router = express.Router();
const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();

const upload = multer({ dest: 'upload/' }).single('image');

router.post('/', async (req, res, next) => {
    await upload(req, res, async (err) => {
        if (err) {
            next(err);
            return;
        }

    })
});

module.exports = {
    router,
};
