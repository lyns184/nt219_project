const typeModel = require('../models/type');
const getAllCatatlog = async () => {
	return typeModel.find({}).populate().lean().exec();
};

module.exports = {
	getAllCatatlog,
};
