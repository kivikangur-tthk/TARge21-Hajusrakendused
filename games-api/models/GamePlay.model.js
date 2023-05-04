module.exports = (sequelize, Sequelize, Game, Player) => {
  const GamePlay = sequelize.define("gameplay", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gameId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Game,
        key: "id",
      },
    },
    playerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Player,
        key: "id",
      },
    },
  })
  Game.belongsToMany(Player, { through: GamePlay })
  Player.belongsToMany(Game, { through: GamePlay })
  Game.hasMany(GamePlay)
  GamePlay.belongsTo(Game)
  Player.hasMany(GamePlay)
  GamePlay.belongsTo(Player)
  return GamePlay
}
