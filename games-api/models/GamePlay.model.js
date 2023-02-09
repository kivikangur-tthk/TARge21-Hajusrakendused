module.exports = (sequelize, Sequelize, Game, Player) => {
  const GamePlay = sequelize.define("gameplay", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gameId: {
      type: Sequelize.INTEGER,
      references: {
        model: Game,
        key: "id",
      },
    },
    playerId: {
      type: Sequelize.INTEGER,
      references: {
        model: Player,
        key: "id",
      },
    },
  })
  Game.belongsToMany(Player, { through: GamePlay })
  Player.belongsToMany(Game, { through: GamePlay })
  return GamePlay
}
