const express = require('express');
const app = express();

// Load ENV -> Clusters
const dotenv = require('dotenv');
dotenv.config();

// Disable powered by
app.disable('x-powered-by');

// Middlewares
const cors = require('cors');
const compression = require('compression');
const cookiePaser = require('cookie-parser');
const { auth } = require('express-openid-connect');
const { auth0 } = require('./config/config');

app.use(auth(auth0));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(cookiePaser());

// Routes
const authRouter = require('./routes/auth.route');
app.use('/auth', authRouter);

// 404, Error handler
app.use((req, res, next) => {
	res.status(404).send('NOT FOUND');
});

app.use((error, req, res, next) => {
	console.error(error);
	res.status(500).json({
		data: {
			error: 'Internal Server Error',
		},
	});
});

module.exports = app;
