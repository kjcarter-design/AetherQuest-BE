const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  log: {
    type: String,
  },

  questStep: {
    type: String,
    //required: true,
  },

  reward: {
    type: String,
    //required: true,
  },

  currentQuest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quest'
  },

  attachedQuests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quest'
  }],
  
  attachedCharacters: [{
    type: mongoose.Schema.Types.ObjectId,
        ref: 'Character'
  }],

  attachedStoryteller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  image: { type: String },
});

const game = mongoose.model("Game", gameSchema);

// Export our model
module.exports = game;
