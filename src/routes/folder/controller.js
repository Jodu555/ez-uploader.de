const { folderCreationSchema } = require('../../database/schemas');
const { v4 } = require('uuid');
const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();

const get = async (req, res, next) => {
    try {
        const account_UUID = req.credentials.user.UUID;
        const folders = await database.get('folders').get({ account_UUID });
        res.json(folders);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    get,
}