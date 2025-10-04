const productService = require('../services/product.service');
class ProductController {
	async getAllProducts(req, res) {
		return productService.getAllProducts().then((products) => {
			return res.status(200).json({
				success: true,
				data: products,
			});
		});
	}

	async getProduct(req, res) {
		const { id } = req.params;
		return productService.getProduct(id).then((product) => {
			if (!product) {
				return res.status(404).json({
					success: false,
					message: 'Product not found',
				});
			}
			return res.status(200).json({
				success: true,
				data: product,
			});
		});
	}
}

module.exports = new ProductController();
