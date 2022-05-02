const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const sequelize = require('./config/connection');

//create handlebars object
const hbs = exphbs.create({});

//create sessions object
  //secret should be assigned to a .env variable
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

//set up handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//set up sessions
app.use(session(sess));

//set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
  //express.static is a middleware function that can take contents of a folder and serve them as static assets, useful for front end files
app.use(express.static(path.join(__dirname, 'public')));

//turn on routes
app.use(routes);

//turn on connection to db and server
  //'force: false' states that we DONT want to drop all tables on startup of the server
  //'force: true' states that we DO want to drop all tables on startup and recreate them if there are any association changes
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, ()=> console.log(`Now Listening on port ${PORT}`));
});