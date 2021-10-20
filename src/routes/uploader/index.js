const express = require('express');
const multer = require('multer');
const { v4 } = require('uuid');
const router = express.Router();
const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();



router.post('/', async (req, res, next) => {
    const account_UUID = req.credentials.user.UUID;
    await upload(req, res, async (err) => {
        if (err) {
            next(err);
            return;
        }
        const entry = {
            UUID: v4(),
            folder_UUID: (await database.get('folders').actions.getRootFolder(account_UUID)).UUID,
            public: 0,
            share: 0,
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
