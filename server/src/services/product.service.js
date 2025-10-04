const productModel = require('../models/product');

const getAllProducts = async () => {
	return productModel.find({}).lean().exec();
};

const getProduct = async (id) => {
	return productModel.findById(id).lean().exec();
};

module.exports = {
	getAllProducts,
	getProduct,
};
