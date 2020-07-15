require('dotenv').config();
const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const db = require('./db/index');
const PORT = 8080;
const Session = require('express-session')
const FileStore = require('session-file-store')(session);


// Express Configuration
// App.use(cors());
App.use(BodyParser.urlencoded({ extended: false }));
App.use(Express.static('public'));
App.use(BodyParser.json());

App.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});

const usersQueries = require('./db/routes/user');
const gamesQueries = require('./db/routes/game');
App.use('/api/user', usersQueries(db));
App.use('/api/game', gamesQueries(db));
