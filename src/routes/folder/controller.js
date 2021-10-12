const { folderCreationSchema } = require('../../database/schemas');
const { v4 } = require('uuid');
const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();

const get = async (req, res, next) => {
    const userUUID = req.credentials.user.UUID;
}

module.exports = {
    get,
}