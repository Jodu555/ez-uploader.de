const express = require('express');
const multer = require('multer');
const { v4 } = require('uuid');
const router = express.Router();
const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
        const fileName = req.api + '.' + file.originalname.toLowerCase().split('.')[1];
        cb(null, fileName)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileSize = parseInt(req.headers['content-length']);
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg formats allowed!'));
        }
    }
}).single('image');

router.post('/', async (req, res, next) => {
    const account_UUID = req.credentials.user.UUID;
    const entry = {
        UUID: v4(),
        folder_UUID: (await database.get('folders').actions.getRootFolder(account_UUID)).UUID,
        public: 0,
        share: 0,
    }
    req.api = entry.UUID;

    await upload(req, res, async (err) => {
        if (err) {
            next(err);
            return;
        }

        console.log(entry);
        res.json(entry);
        // const created = database.get('entrys').create(entry);
        // res.json(created);
    })
});

module.exports = {
    router,
};
