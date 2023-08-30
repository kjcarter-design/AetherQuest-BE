const AWS = require('aws-sdk');
const Character = require('../models/character.model');
const User = require('../models/user.model');
const characterController = {
	getCharacters: async function (req, res) {
		let query = {};

		if (req.query.name) {
			const regex = new RegExp(`.*${req.query.name}.*$`, 'i');
			query.name = { $regex: regex };
		}

		try {
			let allCharacters = await Character.find(query);
			res.json(allCharacters);
		} catch (error) {
			console.log('Error getting all characters: ' + error);

			res.status(400).json({
				message: error.message,
				statusCode: res.statusCode,
			});
		}
	},

	getCharacter: async function (req, res) {
		try {
			const characterName = req.params.name;

			let foundCharacter = await Character.findOne({ name: characterName });

			if (foundCharacter) {
				res.json(foundCharacter);
			} else {
				res.status(404).send({
					status: res.statusCode,
					message: 'User Not Found!',
				});
			}
		} catch (error) {
			console.log('error getting user: ' + error);
			res.status(400).json({
				message: error.message,
				statusCode: res.statusCode,
			});
		}
	},

	createCharacter: async function (req, res) {
		try {
				const characterData = req.body;
				console.log(characterData);

				// Generate the object URL for the uploaded image

				let newCharacter = await Character.create(characterData);

				const userId = req.body.userId;
				const user = await User.findById(userId);

				if (!user) {
						return res.status(404).json({ message: 'User not found' });
				}

				user.characters.push(newCharacter._id);
				await user.save();

				res.status(201).json(await Character.findById(newCharacter._id));
		} catch (error) {
				console.log('failed to create character: ' + error);
				res.status(400).json({
						message: error.message,
						statusCode: res.statusCode,
				});
		}
},

updateCharacter: async function (req, res) {
		try {
				const characterId = req.params.characterId;
				const updatedData = req.body;

				// Generate the object URL for the uploaded image
			
				
				let character = await Character.findById(characterId);

				if (character) {
						Object.assign(character, updatedData);
						await character.save();
						res.json(character);
				} else {
						res.status(404).send({
								message: 'Character Not Found!',
								statusCode: res.statusCode,
						});
				}
		} catch (error) {
				console.log('Failed to update character: ' + error);
				res.status(400).json({
						message: error.message,
						statusCode: res.statusCode,
				});
		}
},

	deleteCharacter: async function (req, res) {
    try {
        const characterId = req.params.characterId;

        // Delete the character from the Characters collection
        let character = await Character.findByIdAndDelete(characterId);

        if (character) {
            // Find the user and remove the character's ID from the characters array
            const user = await User.findOne({ characters: characterId });
            if (user) {
                user.characters.pull(characterId); // This will remove the characterId from the characters array
                await user.save();
            }

            res.json({ message: 'Character deleted successfully!' });
        } else {
            res.status(404).send({
                message: 'Character Not Found!',
                statusCode: res.statusCode,
            });
        }
    } catch (error) {
        console.log('Failed to delete character: ' + error);
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode,
        });
    }
}

};

module.exports = characterController;
