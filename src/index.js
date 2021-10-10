const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv').config();

const { Database } = require('@jodu555/mysqlapi');
const database = Database.createDatabase(process.env.DB_HOST,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    process.env.DB_DATABASE);
database.connect();
require('./database/tables').createTables();

const { router: auth } = require('./routes/auth/index');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());


app.use('/auth', auth);

const { errorHandling, notFound } = require('./utils/middleware');
app.use('*', notFound);
app.use(errorHandling);

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
    console.log(`Express App is listening on ${PORT}`);
});