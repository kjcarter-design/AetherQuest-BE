const express = require('express');
const router = express.Router();

// Import the Game controller
const gameController = require('../controllers/game.controller');

const { validateJwtMiddleware } = require("../auth");

router.post('/', validateJwtMiddleware, gameController.createGame);


router.get('/', validateJwtMiddleware, gameController.getGames);

router.get('/:name', validateJwtMiddleware, gameController.getGame);

router.put('/:gameId', validateJwtMiddleware, gameController.updateGame);

router.delete('/:gameId', validateJwtMiddleware, gameController.deleteGame);


module.exports = router;
