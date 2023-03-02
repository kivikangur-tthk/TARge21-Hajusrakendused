const gamesController = require("../controllers/GamesController")
const gamePlaysController = require("../controllers/GamePlaysController")

module.exports = (app) => {
    app.route("/games")
        .get(gamesController.getAll)
        .post(gamesController.createNew)    // Create
    app.route("/games/:id")
        .get(gamesController.getById)       // Read
        .put(gamesController.updateById)    // Update
        .delete(gamesController.deleteById) // Delete
    
    app.route("/gamePlays")
        .get(gamePlaysController.getAll)
}