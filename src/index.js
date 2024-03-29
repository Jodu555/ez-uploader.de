const fs = require('fs');
const path = require('path');
const express = require('express');
const https = require('https');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv').config();

const { Database } = require('@jodu555/mysqlapi');
const database = Database.createDatabase(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_DATABASE);
database.connect();
require('./database/tables').createTables();

//Test Account: Jodu:Test123:test@test.com
const authManager = require('./utils/authManager');
(async () => {
	// authManager.addToken('SECRET-DEV-KEY', await database.get('accounts').getOne({ UUID: 'ebb4429d-9501-461c-a825-81d50d506837' }));
})();

//TODO: surround all routes with try catch to display the errors in errorHandler

const { router: auth } = require('./routes/auth/index');
const { router: folder } = require('./routes/folder/index');
const { router: entry } = require('./routes/entry/index');
const { router: upload } = require('./routes/uploader/index');
const { router: image } = require('./routes/image/index');
const { router: profile } = require('./routes/profile/index');
const { router: info } = require('./routes/info/index');

const app = express();
app.use(cors());
app.use(
	morgan('dev', {
		skip: (req, res) => req.originalUrl.startsWith('/image/') || req.originalUrl.startsWith('/favicon/'),
	})
);
// app.use(helmet({
//     contentSecurityPolicy: {
//         directives: {
//             defaultSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'cdnjs.cloudflare.com', 'fonts.gstatic.com', 'data:', 'https:', 'all'],
//             scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'cdnjs.cloudflare.com', 'maxcdn.bootstrapcdn.com', 'docs.jodu555.de', 'cdn.jsdelivr.net'],
//             styleSrc: ["'self'", "'unsafe-inline'", 'maxcdn.bootstrapcdn.com', 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'fonts.googleapis.com'],
//             imgSrc: ["'self'", 'images.jodu555.de', 'data:'],
//             connectSrc: ["'self'"],
//             fontSrc: ["'self'", 'fonts.gstatic.com', 'cdnjs.cloudflare.com', 'data:'],
//             objectSrc: ["'self'"],
//             mediaSrc: ["'self'"],
//             frameSrc: ["'self'"]
//         },
//         reportOnly: true
//     }
// }));

app.use(express.json());
app.use(express.static('static'));
app.set('view engine', 'ejs');

const pages = fs.readdirSync('views/pages');
pages.forEach((page) => {
	let route = '/';
	if (!page.includes('index')) route += page.split('.')[0];
	app.get(route, (req, res) => res.render('pages/' + page));
});

app.use('/auth', auth);
app.use('/folder', authManager.authentication, folder);
app.use('/entry', authManager.authentication, entry);
app.use('/upload', upload);
app.use('/profile', authManager.authentication, profile);
app.use('/image', image);
app.use('/info', info);

const { errorHandling, notFound } = require('./utils/middleware');
app.use('*', notFound);
app.use(errorHandling);

const PORT = process.env.PORT || 3100;
if (process.env.https) {
	const sslProperties = {
		key: fs.readFileSync(process.env.KEY_FILE),
		cert: fs.readFileSync(process.env.CERT_FILE),
	};
	https.createServer(sslProperties, app).listen(PORT, () => {
		console.log(`Express App Listening with SSL on ${PORT}`);
	});
} else {
	app.listen(PORT, async () => {
		console.log(`Express App Listening on ${PORT}`);
	});
}
