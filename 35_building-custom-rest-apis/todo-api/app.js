const express = require('express');

const db = require('./data/database');

const app = express();

app.use((error, req, res,next) => {
	res.status(500).json({
		message: 'Somenthing went wrong',
		error: error
	});
});

db.initDb()
	.then(() => app.listen(3000))
	.catch((error) => console.log('Connection to db failed', error));
