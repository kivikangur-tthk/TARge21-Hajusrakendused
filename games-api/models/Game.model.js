module.exports = (sequelize,Sequelize) => {
    const Game = sequelize.define("game", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(4096),
            allowNull: false
        },
        studio: {
            type: Sequelize.STRING,
            allowNull: false
        },
        genre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        releasedate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    })

    return Game
}