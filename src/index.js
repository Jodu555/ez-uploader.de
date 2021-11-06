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

//Test Account: Finn:Developer:test@test.com
const authManager = require('./utils/authManager');
(async () => {
    authManager.addToken('SECRET-DEV-KEY', await database.get('accounts').getOne({ UUID: '044644dd-f1f8-4200-8029-64a3c872e282' }));
})();

//TODO: surround all routes with try catch to display the errors in errorHandler

const { router: auth } = require('./routes/auth/index');
const { router: folder } = require('./routes/folder/index');
const { router: entry } = require('./routes/entry/index');
const { router: upload } = require('./routes/uploader/index');
const { router: image } = require('./routes/image/index');


const app = express();
app.use(cors());
app.use(morgan('dev', {
    skip: (req, res) => req.originalUrl.startsWith('/image/'),
}));
// app.use(helmet());
app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/index');
})

app.use('/auth', auth);
app.use('/folder', authManager.authentication, folder);
app.use('/entry', authManager.authentication, entry);
app.use('/upload', authManager.authentication, upload);
app.use('/image', image)

const { errorHandling, notFound } = require('./utils/middleware');
app.use('*', notFound);
app.use(errorHandling);

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
    console.log(`Express App is listening on ${PORT}`);
});