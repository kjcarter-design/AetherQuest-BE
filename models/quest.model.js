const mongoose = require("mongoose");

const questSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  hook: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  targetGoal: {
    // (kidnap, recruit, obtain, destroy, kill)
    type: String,
    required: true,
  },
  reward: {
    type: String,
    required: true,
  },
  completionDialog: {
    type: String,
    required: true,
  },
  step: {
		type: String,
		description: String,
    completed: Boolean,
    encounters: String,
    reward: String,
    xp: { type: Number, default: 0 },
  },
  steps: {
		type: Array,
    descriptions: [],
		encounters: [],
    default: [],
    required: true,
  },
  encounter: {
		type: Array,
		description: String,
    completed: Boolean,
    encounters: String,
    reward: String,
    xp: { type: Number, default: 0 },
  },
  attachedGames: {
    type: Array,
    default: [],
  },
  image: { type: String },
});

const quest = mongoose.model("Quest", questSchema);

// Export our model
module.exports = quest;
