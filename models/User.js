//import model class and datatypes object
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create user model
class User extends Model {}

//define table columns and configuration
User.init(
  {
    //table column definitions
    //define id column
    id: {
      //use the special Sequelize dataTypes object ro provide what data it is
      type: DataTypes.INTEGER,
      //equivilent of NOT NULL
      allowNull: false,
      //instruct it's the primary key
      primaryKey: true,
      //turn on auto increment
      autoIncrement: true
    },
    //define username column
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      //there cannot be duplicates
      unique: true,
      //if allownull is set to false, we can run our data through validators before creating table data
      validate: {
        isEmail: true
      }
    },
    //define password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //password must be 4 char long
        len: [4]
      }
    }
  },
  {
    //table configuration options
    //pass in our imported sequelize conection
    sequelize,
    //dont automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    //dont pluralize name of database
    freezeTableName: true,
    //use underscores instead of camel casing
    underscored: true,
    //make it so the model name stays lowercase in the database
    modelName: 'user'
  }
);

module.exports = User;