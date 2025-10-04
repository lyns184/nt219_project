const catalogController = require('../../../controllers/catalog.controller');
const router = require('express').Router();

router.get('/all', catalogController.getAllCatatlog);

module.exports = router;
