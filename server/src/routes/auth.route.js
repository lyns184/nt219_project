const authController = require('../controllers/auth.controller');
const router = require('express').Router();

const { requiresAuth } = require('express-openid-connect');
const checkPermissions = require('../middlewares/checkPermission');

router.get('/profile', requiresAuth(), (req, res) => {
	console.log(req.oidc.user.roles);
	res.send(JSON.stringify(req.oidc.user));
});

router.get('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/callback', authController.callback);

module.exports = router;
