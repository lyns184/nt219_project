const productController = require('../../../controllers/product.controller');
const router = require('express').Router();

router.get('/all', productController.getAllProducts);
router.get('/:id', productController.getProduct);

module.exports = router;
