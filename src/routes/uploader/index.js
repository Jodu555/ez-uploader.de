const express = require('express');
const multer = require('multer');
const { v4 } = require('uuid');
const router = express.Router();
const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();

const authManager = require('../../utils/authManager');

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
    try {
        if (!await auth(req, res, next))
            return;

        const account_UUID = req.credentials.user.UUID;
        const entry = {
            UUID: v4(),
            folder_UUID: (await database.get('folders').actions.getRootFolder(account_UUID)).UUID,
            type: 'image',
            public: 0,
            share: 0,
        }
        req.api = entry.UUID;

        await upload(req, res, async (err) => {
            if (err) {
                next(err);
                return;
            }
            if (!req.file) {
                next(new Error('No file present in request body!'));
                return;
            }
            const created = database.get('entrys').create(entry);
            res.json(created);
        })
    } catch (error) {
        next(error);
    }
});

const auth = async (req, res, next) => {
    const authToken = req.headers['auth-token'];
    const shareXToken = req.headers['sharex-token'];

    if (authToken || shareXToken) {
        if (authToken) {
            if (authManager.getToken(authToken)) {
                req.credentials = {
                    token,
                    user: getUser(token),
                };
                return true;
            } else {
                next(new Error('Invalid auth-token!'));
                return false;
            }
        }
        if (shareXToken) {
            const response = await database.get('accounts').getOne({ shareXUploadToken: shareXToken, unique: true });
            if (response) {
                delete response.password;
                req.credentials = {
                    token: shareXToken,
                    user: response,
                };
                return true;
            } else {
                next(new Error('Invalid shareX-token!'));
                return false;
            }
        }
    } else {
        next(new Error('Missing auth-token or shareX-token in headers!'));
        return false;
    }
    return false;
}

module.exports = {
    router,
};
