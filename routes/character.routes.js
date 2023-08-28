const express = require('express');
const router = express.Router();

// Import the character controller
const characterController = require('../controllers/character.controller');

const { validateJwtMiddleware } = require("../auth");

router.post('/', validateJwtMiddleware, characterController.createCharacter);


router.get('/', validateJwtMiddleware, characterController.getCharacters);

router.get('/:name', validateJwtMiddleware, characterController.getCharacter);

router.put('/:characterId', validateJwtMiddleware, characterController.updateCharacter);

router.delete('/:characterId', validateJwtMiddleware, characterController.deleteCharacter);


module.exports = router;
