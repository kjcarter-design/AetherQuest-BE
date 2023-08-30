const mongoose = require("mongoose");




const characterSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
	},
	class: {
		name: { type: String, required: true },
		desc: { type: String, default: "" },
		prof_weapons: { type: [String], default: [] },
	},
	abilityScores: {
		STR: { type: Number, default: 10, select: false },
		DEX: { type: Number, default: 10, select: false },
		CON: { type: Number, default: 10, select: false },
		INT: { type: Number, default: 10, select: false },
		WIS: { type: Number, default: 10, select: false },
		CHA: { type: Number, default: 10, select: false },
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
			name: String
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
		type: Array,
		default: []
	},
	attachedGames: {
		type: Array,
		default: []
	},
	image: { type: String },
});


const character = mongoose.model('Character', characterSchema);

// Export our model
module.exports = character;