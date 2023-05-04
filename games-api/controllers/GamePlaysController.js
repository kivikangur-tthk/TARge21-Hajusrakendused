const { db } = require("../db")
const GamePlays = db.gamePlays
const Game = db.games
exports.getAll = async (req, res) => {
  const gamePlays = await GamePlays.findAll({
    include: { all: true },
    logging: console.log,
  })
  console.log(gamePlays)
  let result = []
  result = gamePlays.map((gp) => {
    return {
      gameName: gp.game.name,
      playerName: `${gp.player.name}`,
    }
  })
  res.send(result)
}
exports.createNew = async (req, res) => {
  let gamePlay
  try {
    gamePlay = await GamePlays.create(req.body)
  } catch (error) {
    if (error instanceof db.Sequelize.ValidationError) {
      res.status(400).send({ error: error.errors.map((item) => item.message) })
    } else if (error instanceof db.Sequelize.ForeignKeyConstraintError){
        res.status(400).send({"error":`Table:${error.table} does not contain row with id:${error.value}`})
    } else {
      console.log("GamePlaysCreate: ", error)
      res
        .status(500)
        .send({ error: "Something went wrong on our side. Sorry :(" })
    }
    return
  }
  res
    .status(201)
    .location(`${getBaseUrl(req)}/gamePlays/${gamePlay.id}`)
    .json(gamePlay)
}

exports.deleteById = async (req, res) => {
  let result
  try {
    result = await GamePlays.destroy({ where: { id: req.params.id } })
  } catch (error) {
    console.log("GamePlaysDelete: ", error)
    res
      .status(500)
      .send({ error: "Something went wrong on our side. Sorry :(" })
    return
  }
  if (result === 0) {
    res.status(404).send({ error: "GamePlay not found" })
    return
  }
  res.status(204).send()
}
