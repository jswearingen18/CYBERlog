// Gets express to allow server connection
const express = require("express");
// Set up server.js to connect to all Routes
const routes = require("./routes");
// import sequelize connection
const sequelize = require("./config/connection");
// Sets express up as a variable called app 
// for different express functions
const app = express();
// Assigning a server port as a variable
// called PORT
const PORT = process.env.PORT || 4545;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
