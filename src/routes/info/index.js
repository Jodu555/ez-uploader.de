const express = require('express');
const router = express.Router();
const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();

const cacheTime = 1000 * 60 * 60;

router.get('/', async (req, res, next) => {
    try {
        if (database.cache && database.cache.infos && (database.cache.infos.time >= Date.now())) {
            res.json({ ...database.cache.infos, cached: true });
        } else {
            database.cache = database.cache || {};
            const accounts = await database.get('accounts').get();
            const entrys = await database.get('entrys').get();
            const folders = await database.get('folders').get();
            database.cache.infos = {
                time: Date.now() + cacheTime,
                accounts: accounts.length,
                entrys: entrys.length,
                folders: folders.length
            }
            res.json({ ...database.cache.infos, cached: false });
        }
    } catch (error) {
        next(error);
    }
})


module.exports = { router };