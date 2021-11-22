// starts imports of libraries
const express = require('express');
const path = require('path');
// starts routes middleware for controllers
const routes = require('./controllers');

//starts imports of libraries as well
const sequelize = require('./config/connection');

// helper functions
const helpers = require('./utils/helpers');

// library import
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers}); 

// start express session store
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Initiate express 
const app = express();

// Listening port
const PORT = process.env.PORT || 3001;
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// Use sequelize to create models
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
