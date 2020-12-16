const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./router');
const client = require('./router/redis.js')
const compression = require('compression');

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const app = express();

app.use(compression());

app.use(morgan('tiny'));
app.use(express.static(PUBLIC_DIR));

app.get('/loaderio-3aa719e80939405d30971b29b3d8fada.txt', (req, res) => {
	res.sendFile(path.join(__dirname, '../loaderio.txt'));
})

// Middleware to catch any IDs that are in the Redis cache
app.use('/api', (req, res, next) => {
	let url = req.url;
	let split = url.split('/');
	let id = split[split.length-1]

	client.exists(id, (err, reply) => {
		if (reply === 1) {
			console.log('Pulling from Redis cache')
			client.get(id, (err, reply) => {
				if (err) {console.log(err)}
				res.send(JSON.parse(reply));
			})
		} else {
			next();
		}
	})
})

// Handling asset requests for webpack bundles by passing off requests to the bundles router
app.use('/bundles', router.bundles);

// Handling AJAX requests to the API by passing off requests to the api router
app.use('/api', router.api);

module.exports = app;
