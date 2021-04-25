// I have to repeat this piece of code here because when sequelize-cli is run, it doesn't have access to app.js, 
// so he will access config/database directly, so for it to also load the project's env variables it needs to be here too 

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || 'mysql',
  storage: './__tests__/database.sqlite',
  operatorsAliases: false,
  logging: false,
  define:{
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  }
}