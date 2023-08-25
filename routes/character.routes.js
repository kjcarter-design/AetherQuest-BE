const express = require('express');
const router = express.Router();

// Import the character controller
const characterController = require('../controllers/character.controller');

const { validateJwtMiddleware } = require("../auth");

router.post('/', validateJwtMiddleware, characterController.createCharacter);


// ... Add more routes (GET, PUT, DELETE) as needed ...


module.exports = router;
