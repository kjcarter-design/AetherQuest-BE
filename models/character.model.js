// Bring in mongoose so we can create a schema that represents the data for a User
const mongoose = require(mongoose);

// Create our schema using mongoose that contains the fields and their data types for our Users
// More info: https://mongoosejs.com/docs/schematypes.html
const characterSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
	},
	race: {
		type: String,
		required: true,
	},
	class: {
		type: String,
		required: true,
	},
	level: {
		type: Number,
		default: 1,
	},
	actions: {
		type: Number,
		default: 1,
	},
	bonusActions: {
		type: Number,
		default: 1,
	},
	armor: {
		type: String,
		ac: Number,
		category: String,
		stealthDisadvantage: Boolean,
		cost: { quantity: Number, unit: String },
	},
	magicItem: {
		type: String,
		rarity: {
			name: Enum,
		},
		description: String,
		cost: { quantity: Number, unit: String },
	},
	meleeWeapon: {
		name: String,
		damage: String,
		description: String,
		cost: { quantity: Number, unit: String },
	},
	shield: {
		name: String,
		acBonus: Number,
		cost: { quantity: Number, unit: String },
	},
	rangedWeapon: {
		name: String,
		damage: String,
		range: {
			normal: Number,
			long: Number,
		},
		cost: { quantity: Number, unit: String },
	},
	cantrip: [
		{
			name: String,
			description: String,
		},
  ],
  inventory: {
    default: []
  },
  attachedGames: {
    default: []
  },
	image: { type: String },
});


const character = mongoose.model('Character', characterSchema);

// Export our model
module.exports = character;