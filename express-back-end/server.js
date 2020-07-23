require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db/index");
const PORT = 8080;

// express config

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());

// session config
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: true,
//     store: new FileStore(),
//   })
// );

// Sample GET route
app.get("/api/data", (req, res) =>
  res.json({
    message: "Seems to work!",
  })
);

// import passport.js for authentication middleware
const passport = require("./lib/passport")(db, app);

const usersQueries = require("./db/routes/user")(db);
const gamesQueries = require("./db/routes/game")(db);
const authQueries = require("./db/routes/auth")(db);

app.use("/api/user", usersQueries);
app.use("/api/game", gamesQueries);
app.use("/api/auth", authQueries);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
