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
  },

  getCharacter: async function(req, res){

    //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
    try {

        //get the email address of the user from the url parameters
        const characterName = req.params.name;
        
        //use our model to find the user that match a query.
        //{email: some@email.com} is the current query which really mean find the user with that email
        //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
        let foundCharacter = await Character.findOne({name: characterName})

        //if we found the user, return that user otherwise return a 404
        if(foundCharacter){
            res.json(foundCharacter)
        }else{
            res.status(404).send({
                status: res.statusCode,
                message: "User Not Found!"
            })
        }
        
    } catch (error) {
        console.log("error getting user: " + error)
        //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find the user
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode
        })

    }
},

  createCharacter: async function(req, res){

    try {

        //store user data sent through the request
        const characterData = req.body;

        //pass the userData to the create method of the User model
        let newCharacter = await Character.create(characterData)

        //return the newly created user
        res.status(201).json(await Character.findById(newCharacter._id))
        
    } catch (error) {
        //handle errors creating user
        console.log("failed to create character: " + error)
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode
        })
    }

}
  // updateCharacter

  // deleteCharacter
}

module.exports = characterController;
