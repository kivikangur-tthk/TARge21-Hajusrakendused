const gamesController = require("../controllers/GamesController")
const gamePlaysController = require("../controllers/GamePlaysController")
const playersController = require("../controllers/PlayersController")

module.exports = (app) => {
    app.route("/games")
        .get(gamesController.getAll)
        .post(gamesController.createNew)    // Create
    app.route("/games/:id")
        .get(gamesController.getById)       // Read
        .put(gamesController.updateById)    // Update
        .delete(gamesController.deleteById) // Delete
    
    app.route("/players")
        .get(playersController.getAll)
        .post(playersController.createNew)    // Create
    app.route("/players/:id")
        .get(playersController.getById)       // Read
        .put(playersController.updateById)    // Update
        .delete(playersController.deleteById) // Delete
    
    app.route("/gamePlays")
        .get(gamePlaysController.getAll)
        .post(gamePlaysController.createNew)    // Create
    app.route("/gamePlays/:id")
        //.get(playersController.getById)       // Read
        //.put(playersController.updateById)    // Update
        .delete(gamePlaysController.deleteById) // Delete

    app.route("/studios")
        .get(gamesController.getStudios)
}