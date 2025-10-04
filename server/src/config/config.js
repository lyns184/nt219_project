module.exports = {
	server: {
		port: process.env.PORT || 3001,
		mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1/nt219_dev',
	},
	auth0: {
		authRequired: false,
		auth0Logout: true,
		secret: process.env.AUTH0_SECRET || 'testestestsetsetestestsetset',
		baseURL: 'http://localhost:3001',
		clientID: 'Ghnbr6cXCTcdTTTbFmcuciidT0DQTpj2',
		clientSecret: process.env.AUTH0_CLIENT_SECRET,
		issuerBaseURL: 'https://dev-4375a5kc4y0v5wtf.us.auth0.com',
		authorizationParams: {
			response_type: 'code',
			response_mode: 'form_post',
		},
		routes: {
			callback: '/auth/callback',
			postLogoutRedirect: 'http://localhost:3000/',
		},
	},
};
