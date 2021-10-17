const { entryCreationSchema, entryUpdateSchema } = require('../../database/schemas');
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

const create = async (req, res, next) => {
    try {
        const account_UUID = req.credentials.user.UUID;
        const validation = entryCreationSchema.validate(req.body);
        if (validation.error) {
            next(new Error(validation.error.details[0].message));
            return;
        } else {
            const entry = validation.value;
            entry.UUID = v4();

            //Check if users owns the provided folder
            if (entry.folder_UUID) {
                if (!await database.get('folders').getOne({ account_UUID, UUID: folder_UUID, unique: true })) {
                    next(new Error('You dont own this folder!'));
                    return;
                }
            }

            entry.folder_UUID = entry.folder_UUID || (await database.get('folders').actions.getRootFolder(account_UUID)).UUID;
            entry.public = entry.public || 0;
            entry.share = entry.share || 0;

            const created = database.get('entrys').create(entry);
            res.json(created);
        }
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const account_UUID = req.credentials.user.UUID;
        const UUID = req.params.uuid;
        const validation = entryUpdateSchema.validate(req.body);
        if (validation.error) {
            next(new Error(validation.error.details[0].message));
            return;
        } else {
            const entry = validation.value;

            //Check if entry oject has keys
            if (Object.keys(entry).length <= 0) {
                next(new Error('You must provide a value which you want to change!'));
                return;
            }
            //Check if user owns the entry
            if (!await database.get('entrys').actions.owns(UUID, account_UUID)) {
                next(new Error('You dont own this entry!'));
                return;
            }
            //Check if he owns the folder in which he want to update the entry in
            if (entry.folder_UUID) {
                if (!await database.get('folders').getOne({ UUID: entry.folder_UUID, account_UUID, unique: true })) {
                    next(new Error('You dont own this folder!'));
                    return;
                }
            }
            const updated = await database.get('entrys').update({ UUID }, entry)
            res.json(updated);
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    get,
    getFromFolder,
    create,
    update
}