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

const create = async (req, res, next) => {
    const validation = folderCreationSchema.validate(req.body);
    if (validatio.error) {
        next(new Error(validatio.error.details[0].message));
    } else {
        const folder = validation.value;
        folder.UUID = v4();
        folder.account_UUID = req.credentials.user.UUID;

        folder.parent_UUID = folder.parent_UUID || await database.get('folders').get({ account_UUID: req.credentials.user.UUID, name: 'ROOT' });
        folder.public = folder.public || 0;
        folder.share = folder.share || 0;
        res.json(folder);
    }
}

module.exports = {
    get,
    create
}