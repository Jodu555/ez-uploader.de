const fs = require('fs');
const path = require('path');
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
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'", 'cdnjs.cloudflare.com', 'fonts.gstatic.com'],
            scriptSrc: ["'self'", "'unsafe-inline'", 'maxcdn.bootstrapcdn.com', 'docs.jodu555.de', 'cdn.jsdelivr.net'],
            styleSrc: ["'self'", "'unsafe-inline'", 'maxcdn.bootstrapcdn.com', 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com'],
            imgSrc: ["'self'", 'images.jodu555.de'],
            connectSrc: ["'self'"],
            fontSrc: ["'self'", 'fonts.gstatic.com', 'cdnjs.cloudflare.com', 'data:'],
            objectSrc: ["'self'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'self'"]
        },
        reportOnly: true
    }
}));

app.use(express.json());
app.use(express.static('static'));
app.set('view engine', 'ejs');

const pages = fs.readdirSync('views/pages');
pages.forEach(page => {
    let route = '/';
    if (!page.includes('index'))
        route += page;
    app.get(route, (req, res) => res.render('pages/' + page))
});


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