const apiController = require('../controllers/api.controller');
const router = require('express').Router();

const { requiresAuth } = require('express-openid-connect');

router.get('/profile', requiresAuth(), (req, res) => {
	res.send(JSON.stringify(req.oidc.user));
});

router.get('/login', apiController.login);
router.get('/logout', apiController.logout);
router.get('/callback', apiController.callback);

module.exports = router;
