const { Schema, model } = require('mongoose');

const schema = new Schema(
	{
		name: { type: String, required: true, unique: true },
		stock: { type: Number, required: true, min: 0 },
		price: { type: Number, required: true, min: 0 },
		description: { type: String },
		type: { type: Schema.Types.ObjectId, ref: 'Type', required: true },
	},
	{ timestamps: true }
);

module.exports = model('Product', schema);
