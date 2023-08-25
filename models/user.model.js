const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");


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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character'
    }],
    ownedCards: {
        type: [{
            cardId: String,
            cardType: String,
            cardDetails: Object
        }],
        default: []
    },
    decks: {
        type: [{
            deckName: String,
            cards: [{
                cardId: String,
                quantity: Number
            }]
        }],
        default: []
    },
    stats: {
        type: {
            gamesPlayed: {
                type: Number,
                default: 0
            },
            gamesWon: {
                type: Number,
                default: 0
            },
            totalXP: {
                type: Number,
                default: 0
            }
        },
        default: {}
    },
    achievements: {
        type: [String],
        default: []
    },
    settings: {
        type: {
            darkMode: {
                type: Boolean,
                default: false
            },
            notifications: {
                type: Boolean,
                default: true
            }
        },
        default: {}
    }
})
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
