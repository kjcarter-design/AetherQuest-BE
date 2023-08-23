const Character = require("../models/character.model")

const characterController = {
  getCharacters: async function(req, res) {
    let query = {}

    if (req.query.name) {
      const regex = new RegExp(`.*${req.query.name}.*$`, "i")
      query.name = {'$regex':regex}
    }

    try {
      let allCharacters = await Character.find(query)
      res.json(allCharacters)
    } catch (error) {
      console.log("error getting all characters: " + error)
      //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any users
      res.status(400).json({
          message: error.message,
          statusCode: res.statusCode
      })

  }
  }

  // getCharacters

  // createCharacter

  // updateCharacter

  // deleteCharacter
}