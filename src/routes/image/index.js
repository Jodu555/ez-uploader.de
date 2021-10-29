const express = require('express');
const { v4 } = require('uuid');
const router = express.Router();
const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();

router.get('/:uuid', (req, res, next) => {
    console.log('Image Request');
})


module.exports = { router };