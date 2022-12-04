const fs = require('fs');
const path = require('path');
const express = require('express');
const { v4 } = require('uuid');
const router = express.Router();
const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();
const authManager = require('../../utils/authManager');

router.get('/:UUID', (req, res, next) => {
	try {
		const UUID = req.params.UUID;
		//TODO: here comes the point on share public etc.
		//TODO: Here comes also the extension choose hin (png, jpg)
		if (authManager.getUser(req.query.key)) {
			const imagePath = path.join(__dirname, '../../../upload', UUID);
			const possibleEndings = ['.png', '.jpg', '.svg'];
			let final = '';
			for (const ending of possibleEndings) {
				if (fs.existsSync(imagePath + ending)) {
					final = imagePath + ending;
					break;
				}
			}
			res.sendFile(final);
		} else {
			next(new Error('Unauthorized!'));
		}
	} catch (error) {
		next(error);
	}
});

module.exports = { router };
