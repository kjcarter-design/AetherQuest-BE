const Game = require('../models/game.model');
const User = require('../models/user.model');

const gameController = {
	getGames: async function (req, res) {
		let query = {};

		if (req.query.name) {
			const regex = new RegExp(`.*${req.query.name}.*$`, 'i');
			query.name = { $regex: regex };
		}

		try {
			let allGames = await Game.find(query);
			res.json(allGames);
		} catch (error) {
			console.log('Error getting all games: ' + error);

			res.status(400).json({
				message: error.message,
				statusCode: res.statusCode,
			});
		}
	},

	getGame: async function (req, res) {
		try {
			const gameName = req.params.name;

			let foundGame = await Game.findOne({ name: gameName });

			if (foundGame) {
				res.json(foundGame);
			} else {
				res.status(404).send({
					status: res.statusCode,
					message: 'User Not Found!',
				});
			}
		} catch (error) {
			console.log('Error getting user: ' + error);
			res.status(400).json({
				message: error.message,
				statusCode: res.statusCode,
			});
		}
	},

	createGame: async function (req, res) {
		try {
			const gameData = req.body;
			console.log(gameData);
			let newGame = await Game.create(gameData);

			const userId = req.body.userId;
			const user = await User.findById(userId);

			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			user.games.push(newGame._id);
			await user.save();

			res.status(201).json(await Game.findById(newGame._id));
		} catch (error) {
			console.log('Failed to create game: ' + error);
			res.status(400).json({
				message: error.message,
				statusCode: res.statusCode,
			});
		}
	},

	updateGame: async function (req, res) {
    try {
        const gameId = req.params.gameId;
        const updatedData = req.body;
        let game = await Game.findById(gameId);

        if (game) {
            Object.assign(game, updatedData);
            await game.save();
            res.json(game);
        } else {
            res.status(404).send({
                message: 'Game Not Found!',
                statusCode: res.statusCode,
            });
        }
    } catch (error) {
        console.log('Failed to update game: ' + error);
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode,
        });
    }
},

	deleteGame: async function (req, res) {
    try {
        const gameId = req.params.gameId;

        // Delete the game from the Games collection
        let game = await Game.findByIdAndDelete(gameId);

        if (game) {
            // Find the user and remove the game's ID from the games array
            const user = await User.findOne({ games: gameId });
            if (user) {
                user.games.pull(gameId); // This will remove the gameId from the games array
                await user.save();
            }

            res.json({ message: 'Game deleted successfully!' });
        } else {
            res.status(404).send({
                message: 'Game Not Found!',
                statusCode: res.statusCode,
            });
        }
    } catch (error) {
        console.log('Failed to delete game: ' + error);
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode,
        });
    }
}

};

module.exports = gameController;
