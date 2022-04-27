//import the Sequelize constructor from the library
const Sequelize = require('sequelize');

//use the enviroment variables created in the .env file
require('dotenv').config();

let sequelize;

//create connection to our new database, pass in your MySQL info
if(process.env.JAWSDB_URL){
  //if it ahs access to process.env.JAWSDB_URL...
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  //if on local machine...
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}



module.exports = sequelize;