const { folderCreationSchema, folderUpdateSchema } = require('../../database/schemas');
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

const getFromFolder = async (req, res, next) => {
    try {
        const account_UUID = req.credentials.user.UUID;
        const folder = req.params.folderUUID;

    } catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    const account_UUID = req.credentials.user.UUID;
    const validation = folderCreationSchema.validate(req.body);
    if (validation.error) {
        next(new Error(validation.error.details[0].message));
    } else {
        const folder = validation.value;
        folder.UUID = v4();
        folder.account_UUID = account_UUID;

        //Validate if parent_UUID is a folder which the user owns
        if (folder.parent_UUID) {
            if (!await database.get('folders').getOne({ account_UUID, UUID: folder.parent_UUID, unique: true })) {
                next(new Error('You dont own this folder!'))
                return;
            }
        }

        //Check if folder name is unique
        if (await database.get('folders').getOne({ account_UUID, name: folder.name, unique: true })) {
            next(new Error('This folder already exists!'));
            return;
        }

        folder.parent_UUID = folder.parent_UUID || (await database.get('folders').actions.getRootFolder(account_UUID)).UUID;
        folder.public = folder.public || 0;
        folder.share = folder.share || 0;
        const created = database.get('folders').create(folder);
        res.json(created);
    }
}

const update = async (req, res, next) => {
    const uuid = req.params.uuid;
    const account_UUID = req.credentials.user.UUID;
    const validation = folderUpdateSchema.validate(req.body);
    if (validation.error) {
        next(new Error(validation.error.details[0].message));
    } else {
        const folder = validation.value;
        //Check if folder oject has keys
        if (Object.keys(folder).length <= 0) {
            next(new Error('You must provide a value which you want to change!'));
            return;
        }
        //Check if user owns the folder
        if (!await database.get('folders').getOne({ UUID: uuid, account_UUID, unique: true })) {
            next(new Error('You dont own this folder!'));
            return;
        }
        //Check if the user want to edit the name or the parent_UUID of the root folder
        if ((folder.name || folder.parent_UUID) && (await database.get('folders').actions.getRootFolder(account_UUID)).UUID == uuid) {
            next(new Error('You cannot change the name or the parent_UUID of the root folder!'));
            return;
        }

        const updated = await database.get('folders').update({
            UUID: uuid,
            account_UUID,
            unique: true,
        }, folder);

        res.json(updated);
    }
};

module.exports = {
    get,
    create,
    update,
    getFromFolder
}