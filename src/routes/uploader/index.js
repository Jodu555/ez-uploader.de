const express = require('express');
const multer = require('multer');
const authManager = require('../../utils/authManager');
const router = express.Router();


const upload = multer({ dest: 'upload/' }).single('image');

router.post('/', (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            next(err);
            return;
        }
    })
});

module.exports = {
    router,
};
