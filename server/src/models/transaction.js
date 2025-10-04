const { Schema, model } = require('mongoose');
const schema = new Schema(
	{
		amount: { type: Number, required: true },
		order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
		provider: { type: String, required: true },
		status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
	},
	{ timestamps: true }
);

module.exports = model('Transaction', schema);
