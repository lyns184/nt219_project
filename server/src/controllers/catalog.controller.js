const catalogService = require('../services/catalog.service');
class CatalogController {
	getAllCatatlog(req, res) {
		return catalogService.getAllCatatlog().then((data) => res.json(data));
	}
}

module.exports = new CatalogController();
