//import the Sequelize constructor from the library
const Sequelize = require('sequelize');

//use the enviroment variables created in the .env file
require('dotenv').config();

//create connection to our new database, pass in your MySQL info
const sequilize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

module.exports = sequilize;