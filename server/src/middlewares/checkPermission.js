const checkPermissions = (permission) => (req, res, next) => {
	const userPermissions = req.auth.payload.permissions || [];
	if (userPermissions.includes(permission)) {
		next();
	} else {
		res.status(403).send('Forbidden: Insufficient permissions');
	}
};
module.exports = checkPermissions;
