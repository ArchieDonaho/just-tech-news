const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//turn on routes
app.use(routes);

//turn on connection to db and server
  //'force: false' states that we DONT want to drop all tables on startup of the server
  //'force: true' states that we DO want to drop all tables on startup and recreate them if there are any association changes
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, ()=> console.log(`Now Listening on port ${PORT}`));
});