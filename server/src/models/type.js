const { Schema, model } = require('mongoose');

const schema = new Schema(
	{
		name: { type: String, required: true, unique: true },
		description: { type: String },
	},
	{ timestamps: true }
);

module.exports = model('Type', schema);
