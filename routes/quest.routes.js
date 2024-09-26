const express = require('express');
const router = express.Router();

// Import the quest controller
const questController = require('../controllers/quest.controller');

const { validateJwtMiddleware } = require("../auth");

router.post('/', validateJwtMiddleware, questController.createQuest);


router.get('/', validateJwtMiddleware, questController.getQuests);

router.get('/:name', validateJwtMiddleware, questController.getQuest);

router.put('/:questId', validateJwtMiddleware, questController.updateQuest);

router.delete('/:questId', validateJwtMiddleware, questController.deleteQuest);


module.exports = router;
