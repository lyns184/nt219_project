const ms = require('ms');
const { Schema, model } = require('mongoose');

// ROBLOX
const freeUserSchema = new Schema(
	{
		ipAddress: {
			type: String,
			required: true,
			unique: true,
		},

		checkpointData: {
			mode: {
				type: Number,
				required: false,
				default: -1,
			},

			validateToken: {
				type: Boolean,
				default: false,
				required: false,
			},
			store: {
				type: [Object],
				default: [],
				required: false,
			},
		},

		keyData: {
			emulatorIpAddress: {
				type: String,
				required: false,
				default: '',
			},
			key: {
				type: String,
				required: false,
				default: '',
			},

			hwid: {
				type: String,
				required: false,
				default: '',
			},

			expireAt: {
				type: Date,
				required: false,
				expires: 0,
				index: true,
			},
		},
	},
	{
		timestamps: true,
	}
);

const premiumUserSchema = new Schema(
	{
		key: {
			type: String,
			required: false,
		},

		hwid: {
			type: String,
			required: false,
		},

		blacklist: {
			type: Boolean,
			default: false,
			required: false,
		},

		hwidCooldown: {
			type: Date,
			required: false,
		},

		idDiscord: {
			type: String,
			required: false,
		},

		reason: {
			type: String,
			required: false,
		},

		code: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const lootlabSchema = new Schema(
	{
		ipAddress: {
			type: String,
			required: true,
		},

		hash: {
			type: String,
			required: false,
		},

		expireAt: {
			type: Date,
			required: false,
			expires: 0,
			default: Date.now() + ms('1d'),
			index: true,
		},
	},
	{
		timestamps: true,
	}
);

freeUserSchema.index({ ipAddress: 1 });
premiumUserSchema.index({ key: 1 });

// VANTABLE
const vantableSchema = new Schema(
	{
		hwid: {
			type: String,
			index: true,
		},

		key: {
			type: String,
			required: true,
			index: true,
		},

		blacklist: {
			type: Boolean,
			default: false,
		},

		inventory: {
			type: [String],
			default: [],
		},

		ard_id: {
			type: String,
		},

		expireAt: {
			type: Date,
			expires: 0,
			index: true,
		},
	},
	{
		timestamps: true,
	}
);

vantableSchema.index({ key: 1 });

module.exports = {
	user: model('freeUser', freeUserSchema),
	premiumUser: model('premiumUser', premiumUserSchema),
	lootlab: model('lootlab', lootlabSchema),
	vantableUser: model('valorant', vantableSchema),
};
