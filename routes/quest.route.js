const express = require('express');
const router = express.Router();

// Import the quest controller
const questController = require('../controllers/quest.controller');

const { validateJwtMiddleware } = require("../auth");

router.post('/', validateJwtMiddleware, questController.createCharacter);


router.get('/', validateJwtMiddleware, questController.getCharacters);

router.get('/:name', validateJwtMiddleware, questController.getCharacter);

router.put('/:questId', validateJwtMiddleware, questController.updateCharacter);

router.delete('/:questId', validateJwtMiddleware, questController.deleteCharacter);


module.exports = router;
