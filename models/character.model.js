const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
	},
	class: {
		index: String,
		name: String,
		hit_die: Number,
		proficiencies: [{
				index: String,
				name: String,
				url: String
		}],
		saving_throws: [{
				index: String,
				name: String,
				url: String
		}],
		starting_equipment: [{
				equipment: {
						index: String,
						name: String,
						url: String
				},
				quantity: Number
		}],
		starting_equipment_options: [{
				desc: String,
				choose: Number,
				type: String,
				from: {
						option_set_type: String,
						options: [{
								option_type: String,
								count: Number,
								of: {
										index: String,
										name: String,
										url: String
								}
						}]
				}
		}],
		class_levels: String,
		spellcasting: {
				level: Number,
				spellcasting_ability: {
						index: String,
						name: String,
						url: String
				},
				info: [{
						name: String,
						desc: [String]
				}]
		},
		spells: String,
		url: String
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
	weapons: [{
    hand: {
        type: String,
        enum: ['main', 'off'],
        required: true
    },
    desc: [String],
    special: [String],
    index: String,
    name: String,
    equipment_category: {
        index: String,
        name: String,
        url: String
    },
    weapon_category: String,
    weapon_range: String,
    category_range: String,
    cost: {
        quantity: Number,
        unit: String
    },
    damage: {
        damage_dice: String,
        damage_type: {
            index: String,
            name: String,
            url: String
        }
    },
    range: {
        normal: Number
    },
    weight: Number,
    properties: [{
        index: String,
        name: String,
        url: String
    }],
    url: String
}],
	shield: {
		name: String,
		acBonus: Number,
		cost: { quantity: Number, unit: String },
	},
	cantrip: {
		name: { type: String, required: false },
		desc: { type: [String], required: false },
		range: { type: String, required: false },
		damage: {
			damage_at_character_level: {
				1: { type: String, default: "1d8" },
				5: { type: String, default: "2d8" },
				11: { type: String, default: "3d8" },
				17: { type: String, default: "4d8" }
			},
			damage_type: {
				index: { type: String, default: "radiant" },
				name: { type: String, default: "Radiant" },
				url: { type: String, default: "/api/damage-types/radiant" }
			}
		},
		dc: {
			dc_success: { type: String, default: "none" },
			dc_type: {
				index: { type: String, default: "dex" },
				name: { type: String, default: "DEX" },
				url: { type: String, default: "/api/ability-scores/dex" }
			}
		}
	},
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
