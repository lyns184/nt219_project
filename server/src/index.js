// const cluster = require('cluster');
const os = require('os');

const numCpus = os.availableParallelism(); // Max cluster can use
// const totalRamEachWorker = Math.floor((totalMemory * 9.3132257461548e-10) / numCpus); // Super balance :]]

const percen = 40; // Su dung de tinh UV_THREADPOOL_SIZE moi worker vi neu set max cpu se break vi du 12 core => 12 * 12 =)))
const calculateForUVAndDb = Math.floor((percen * (numCpus * numCpus)) / 100 / numCpus) || 1;
process.env.UV_THREADPOOL_SIZE = calculateForUVAndDb; // yếu z mấy ba

const fs = require('fs');
const https = require('https');
const app = require('./app');
const server = require('./config/config').server;

require('./database/connectDatabase')(calculateForUVAndDb).then(() => {
	const privateKey = fs.readFileSync('key.pem', 'utf8');
	const certificate = fs.readFileSync('cert.pem', 'utf8');

	const credentials = { key: privateKey, cert: certificate };

	const httpsServer = https.createServer(credentials, app);
	app.listen(server.port, '0.0.0.0', async () => {
		console.log(`MaxPoolSize: ${calculateForUVAndDb}`);
		console.log('Server is running');
	});
});
