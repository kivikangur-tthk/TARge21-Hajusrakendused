module.exports = (sequelize,Sequelize) => {
    const Player = sequelize.define("player", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return Player
}