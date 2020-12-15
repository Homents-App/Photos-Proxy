const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./router');
const client = require('./router/redis.js')

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const app = express();

app.use(morgan('tiny'));
app.use(express.static(PUBLIC_DIR));

app.get('/loaderio-da775ca393b463698d924dd5f047a5aa.txt', (req, res) => {
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

// app.get('/listings/:id', (req, res) => {
// 	console.log('here')
// 	res.sendFile(path.resolve('public', 'index.html'))
// });

// Handling asset requests for webpack bundles by passing off requests to the bundles router
app.use('/bundles', router.bundles);

// Handling AJAX requests to the API by passing off requests to the api router
app.use('/api', router.api);

module.exports = app;
