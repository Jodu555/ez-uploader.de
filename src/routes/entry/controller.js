const { v4 } = require('uuid');
const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();

const get = async (req, res, next) => {
    try {
        const account_UUID = req.credentials.user.UUID;
        const result = await database.get('entrys').actions.getAllFromAccount(account_UUID);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

const getFromFolder = async (req, res, next) => {
    try {
        const account_UUID = req.credentials.user.UUID;
        const folder = req.params.folderUUID;
        const result = (await database.get('entrys').actions.getAllFromAccount(account_UUID)).filter(e => e.folder_UUID == folder);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    get,
    getFromFolder
}