// Bring in mongoose so we can create a schema that represents the data for a User
const mongoose = require("mongoose");
// Require bcrypt to help with password encryption
const bcrypt = require("bcrypt");

// Create our schema using mongoose that contains the fields and their data types for our Users
// More info: https://mongoosejs.com/docs/schematypes.html
const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true,
        minlength: 2
    },
    lastName: {
        type: String, 
        required: true,
        minlength: 2
    },
    email: { 
        type: String, 
        required: true, 
        index: { 
            unique: true 
        },
        match: [/.+\@.+\..+/, "Invalid E-mail Address"],
    },
    password: {
        type: String, 
        required: true,
        select: false
    },
    characters: [{
        characterName: String,
        level: {
            type: Number,
            default: 1
        },
        experience: {
            type: Number,
            default: 0
        },
        currentDeck: [{
            cardId: mongoose.Schema.Types.ObjectId, // Reference to the card's unique ID
            quantity: Number
        }],
        avatar: String // URL or path to avatar image or identifier for preset avatars
    }],
    ownedCards: [{
        cardId: mongoose.Schema.Types.ObjectId, // Reference to the card's unique ID
        quantity: Number
    }],
    decks: [{
        deckName: String,
        cards: [{
            cardId: mongoose.Schema.Types.ObjectId, // Reference to the card's unique ID
            quantity: Number
        }]
    }],
    stats: {
        wins: {
            type: Number,
            default: 0
        },
        losses: {
            type: Number,
            default: 0
        }
        // Other game-related metrics can be added here
    },
    achievements: [{
        title: String,
        description: String,
        dateAchieved: Date
    }],
    settings: {
        theme: {
            type: String,
            default: "default"
        }
        // Other user settings/preferences
    }
});

userSchema.pre('save', function(next) {
    let user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // Generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // Hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // Override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

// Generate the model our code with interact with from the above schema
// Models allow us to interact with the data inside our MongoDB collections
// More info: https://mongoosejs.com/docs/models.html
const User = mongoose.model('User', userSchema);

// Export our model
module.exports = User;
