// gen-products-electronics-furniture.js
// Node.js script: generate test JSON products (Electronics & Furniture)

const fs = require('fs');

// ----- Config -----
const COUNT = Number(process.argv[2]) || 100;

// Điền _id của collection Type nếu bạn đã có sẵn trong DB
// (Giữ nguyên placeholder nếu chưa có, sau này search/replace là xong)
const TYPE_IDS = [
	{ name: 'Electronics', _id: '6715f0aa1c2a4b5c6d7e8e01' },
	{ name: 'Furniture', _id: '6715f0aa1c2a4b5c6d7e8e02' },
];

const adjectives = ['Basic', 'Pro', 'Ultra', 'Max', 'Lite', 'Smart', 'Eco', 'Prime', 'Studio', 'Plus', 'Compact', 'Modern', 'Classic'];

const electronicsModels = [
	'4K TV',
	'Bluetooth Speaker',
	'Wireless Earbuds',
	'Gaming Laptop',
	'Mechanical Keyboard',
	'Gaming Mouse',
	'USB-C Hub',
	'Fast Charger',
	'Action Camera',
	'VR Headset',
	'Portable SSD',
	'Wi-Fi Router',
	'Smartwatch',
	'Noise-Canceling Headphones',
	'Dash Cam',
	'Microphone',
	'Webcam',
	'Graphics Tablet',
	'Drone',
	'Mini PC',
];

const furnitureModels = [
	'Office Chair',
	'Standing Desk',
	'Bookshelf',
	'Sofa',
	'Coffee Table',
	'TV Stand',
	'Bed Frame',
	'Nightstand',
	'Wardrobe',
	'Dining Table',
	'Dining Chair',
	'Bar Stool',
	'Storage Cabinet',
	'Shoe Rack',
	'Dresser',
	'Computer Desk',
	'Corner Shelf',
	'Console Table',
	'Bean Bag',
	'Recliner',
];

function rint(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick(arr) {
	return arr[rint(0, arr.length - 1)];
}

function priceByType(typeName) {
	if (typeName === 'Electronics') return Number((rint(20, 1500) + Math.random()).toFixed(2));
	// Furniture
	return Number((rint(30, 1200) + Math.random()).toFixed(2));
}

function stockByType(typeName) {
	if (typeName === 'Electronics') return rint(5, 120);
	// Furniture
	return rint(2, 60);
}

function buildName(typeName, serial) {
	const adj = pick(adjectives);
	const model = typeName === 'Electronics' ? pick(electronicsModels) : pick(furnitureModels);
	return `${adj} ${model} #${String(serial).padStart(3, '0')}`;
}

const products = [];
for (let i = 0; i < COUNT; i++) {
	const typ = TYPE_IDS[i % TYPE_IDS.length]; // 50–50
	const name = buildName(typ.name, i + 1);
	const price = priceByType(typ.name);
	const stock = stockByType(typ.name);

	const details =
		typ.name === 'Electronics'
			? `Category: ${typ.name}. Includes basic accessories. 12-month warranty.`
			: `Category: ${typ.name}. Easy assembly with included tools. 12-month warranty.`;

	products.push({
		name,
		stock,
		price,
		description: `${details} Batch ${String(i + 1).padStart(3, '0')}.`,
		type: typ._id,
		// Nếu muốn, thêm timestamps “giả”:
		// createdAt: new Date().toISOString(),
		// updatedAt: new Date().toISOString(),
	});
}

fs.writeFileSync('products.json', JSON.stringify(products, null, 2), 'utf8');
console.log(`Generated ${products.length} products -> products.json`);
console.log('Types:');
TYPE_IDS.forEach((t) => console.log(`- ${t.name}: ${t._id}`));

/*
Import:
mongoimport --uri "mongodb://localhost:27017/yourdb" --collection products --file products.json --jsonArray

Seed bằng Mongoose:
const products = require('./products.json');
await Product.insertMany(products);
*/
