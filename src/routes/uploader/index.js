const express = require('express');
const multer = require('multer');
const authManager = require('../../utils/authManager');
const router = express.Router();


const upload = multer().single('image');

router.post('/', (req, res, next) => {
    upload(req, res, (err) => {
        if (err)
            throw err;
        // if (err instanceof multer.MulterError) {
        // } else if (err) {
        // }

    })
});

module.exports = {
    router,
};
