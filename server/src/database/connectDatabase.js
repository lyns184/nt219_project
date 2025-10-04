const mongoose = require('mongoose');
const { mongoURI } = require('../config/config').server;

module.exports = async (maxPoolSize) => {
	try {
		await mongoose.connect(mongoURI, {
			minPoolSize: 1,
			maxPoolSize: 3,
			socketTimeoutMS: 60000,
			maxIdleTimeMS: 60000,
			serverSelectionTimeoutMS: 2 * 60 * 10000,
		});

		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error.message);
		process.exit(1);
	}
};
