const path = require('path');
const express = require("express");
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

console.log('PID: ', process.pid);

const app = express();
const PORT = process.env.PORT || 4545;

const hbs = exphbs.create({ helpers });

const sessions = {
  secret: 'blogs are cool',
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sessions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');

app.use(routes);

app.get('/createAccount', (req, res) => {
  response.render('createAccount');
});

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
