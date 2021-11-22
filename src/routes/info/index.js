const express = require('express');
const router = express.Router();
const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();

router.get('/', (req, res, next) => {

})


module.exports = { router };