const { Schema, model } = require('mongoose');

const schema = new Schema(
	{
		orderItems: [{ type: Schema.Types.ObjectId, ref: 'OrderItem', required: true }],
	},
	{ timestamps: true }
);

module.exports = model('Order', schema);
