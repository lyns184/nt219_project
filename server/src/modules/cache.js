// 1 worker 1 cache, promise cache :]] => 12 worker = 2 * 12 => TTL 3 cho viec refresh qua nhanh
const nodeCache = require('node-cache');
let cache;
class Cache {
	constructor() {
		if (!cache) {
			cache = new nodeCache({ stdTTL: 2, checkperiod: 1, deleteOnExpire: true });
			this.cache = cache;
			this.promiseCache = new Map();
			return this;
		} else {
			return this;
		}
	}
}

module.exports = new Cache();
