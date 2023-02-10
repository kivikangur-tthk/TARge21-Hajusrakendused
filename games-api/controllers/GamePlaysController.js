const { db } = require("../db")
const GamePlays = db.gamePlays
const Game = db.games
exports.getAll = async (req,res) => {
    const gamePlays = await GamePlays.findAll({
        include: { all: true },
        logging: console.log
    })
    console.log(gamePlays);
    let result = []
    result = gamePlays.map( (gp) => { 
        return {
            "gameName":gp.game.name,
            "playerName": `${gp.player.name}`
        }
    }) 
    res.send(result)
}