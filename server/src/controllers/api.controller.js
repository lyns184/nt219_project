class ApiController {
	getStatus(req, res) {
		res.send('OK');
	}

	login(req, res) {
		res.oidc.login({
			returnTo: 'http://localhost:3000/',
		});
	}
	callback(req, res) {
		res.oidc.callback({
			redirectUri: 'http://localhost:3001/auth/callback',
		});
	}

	logout(req, res) {
		res.oidc.logout();
	}
}

module.exports = new ApiController();
