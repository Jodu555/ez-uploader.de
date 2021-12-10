const express = require('express');
const router = express.Router();
const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();

const cacheTime = (1000 * 60 * 60 /** 1 Hour */) + 2;

database.registerCache('infos', {
    time: (1000 * 60 * 60 /** 1 Hour */) + 2, // 2 Hours
    calls: 50
}, async (param) => {
    const accounts = await database.get('accounts').get();
    const entrys = await database.get('entrys').get();
    const folders = await database.get('folders').get();
    return {
        accounts: accounts.length,
        entrys: entrys.length,
        folders: folders.length
    }
})

router.get('/', async (req, res, next) => {
    try {
        const output = await database.getCache('infos').get();
        res.json(output);
        // if (database.cache && database.cache.infos && (database.cache.infos.time >= Date.now())) {
        //     res.json({ ...database.cache.infos, cached: true });
        // } else {
        //     database.cache = database.cache || {};
        //     const accounts = await database.get('accounts').get();
        //     const entrys = await database.get('entrys').get();
        //     const folders = await database.get('folders').get();
        //     database.cache.infos = {
        //         time: Date.now() + cacheTime,
        //         accounts: accounts.length,
        //         entrys: entrys.length,
        //         folders: folders.length
        //     }
        //     res.json({ ...database.cache.infos, cached: false });
        // }
    } catch (error) {
        next(error);
    }
})


module.exports = { router };