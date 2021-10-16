const { v4 } = require('uuid');
const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();

const get = async (req, res, next) => {
    const account_UUID = req.credentials.user.UUID;

}

module.exports = {
    get
}