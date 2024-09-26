const Quest = require('../models/quest.model');
const User = require('../models/user.model');
const questController = {
	getQuests: async function (req, res) {
		let query = {};

		if (req.query.name) {
			const regex = new RegExp(`.*${req.query.name}.*$`, 'i');
			query.name = { $regex: regex };
		}

		try {
			let allQuests = await Quest.find(query);
			res.json(allQuests);
		} catch (error) {
			console.log('Error getting all quests: ' + error);

			res.status(400).json({
				message: error.message,
				statusCode: res.statusCode,
			});
		}
	},

	getQuest: async function (req, res) {
		try {
			const questName = req.params.name;

			let foundQuest = await Quest.findOne({ name: questName });

			if (foundQuest) {
				res.json(foundQuest);
			} else {
				res.status(404).send({
					status: res.statusCode,
					message: 'Quest Not Found!',
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

	createQuest: async function (req, res) {
		try {
			const questData = req.body;
			console.log(questData);
			let newQuest = await Quest.create(questData);

			const userId = req.body.userId;
			const user = await User.findById(userId);

			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			user.quests.push(newQuest._id);
			await user.save();

			res.status(201).json(await Quest.findById(newQuest._id));
		} catch (error) {
			console.log('failed to create quest: ' + error);
			res.status(400).json({
				message: error.message,
				statusCode: res.statusCode,
			});
		}
	},

	updateQuest: async function (req, res) {
    try {
        const questId = req.params.questId;
        const updatedData = req.body;
        let quest = await Quest.findById(questId);

        if (quest) {
            Object.assign(quest, updatedData);
            await quest.save();
            res.json(quest);
        } else {
            res.status(404).send({
                message: 'Quest Not Found!',
                statusCode: res.statusCode,
            });
        }
    } catch (error) {
        console.log('Failed to update quest: ' + error);
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode,
        });
    }
},

	deleteQuest: async function (req, res) {
    try {
        const questId = req.params.questId;

        // Delete the quest from the Quests collection
        let quest = await Quest.findByIdAndDelete(questId);

        if (quest) {
            // Find the user and remove the quest's ID from the quests array
            const user = await User.findOne({ quests: questId });
            if (user) {
                user.quests.pull(questId); // This will remove the questId from the quests array
                await user.save();
            }

            res.json({ message: 'Quest deleted successfully!' });
        } else {
            res.status(404).send({
                message: 'Quest Not Found!',
                statusCode: res.statusCode,
            });
        }
    } catch (error) {
        console.log('Failed to delete quest: ' + error);
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode,
        });
    }
}

};

module.exports = questController;
