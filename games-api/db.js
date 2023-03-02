const Sequelize = require("sequelize")
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mariadb",
        define: {
            timestamps: false
        }
    }
)

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.games = require("./models/Game.model")(sequelize,Sequelize)
db.players = require("./models/Player.model")(sequelize,Sequelize)
db.gamePlays = require("./models/GamePlay.model")(sequelize,Sequelize,db.games,db.players)

async function Sync() {
    await sequelize.sync({alter:true}) // alter existing table
    //                   {force:true} // erase existing table and recreate
}

module.exports = { db, Sync }