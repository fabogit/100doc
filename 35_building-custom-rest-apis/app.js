const express = require('express');

const app = express();

app.get('/quote', (req, res) => {
	res.json({
		quote: 'Here is a quote'
	});
});

app.listen(3000);