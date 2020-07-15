const express = require("express");
const router = express.Router();
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

module.exports = db => {
  router.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      store: new FileStore(),
    })
  );

  router.use(passport.initialize());
  router.use(passport.session());

  passport.serializeUser((user, done) => {
    console.log("serialize: ", user);
    done(null, user.email);
  });

  passport.deserializeUser((id, done) => {
    console.log("deserialize: ", id);

    let query = `
            SELECT * FROM users WHERE id = $1;
            `;

    db.query(query, [id])
      .then(data => {
        console.log(data.rows[0]);
        done(null, data.rows[0]);
      })
      .catch(err => {
        done(err, null);
      });
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (username, password, done) => {
        const values = [username, password];
        let query = `
            SELECT * FROM users WHERE email = $1 and password = $2;
            `;

        db.query(query, values)
          .then(data => {
            if (!data.rowCount) {
              return done(null, false, { msg: "Invalid email or password" });
            }
            return done(null, data.rows[0]);
          })
          .catch(err => {
            return done(err);
          });
      }
    )
  );

  router.post("/login_process", passport.authenticate("local"), (req, res) => {
    console.log("yes!");
    if (req.user) {
      return res.json({ redirect: "/" });
    } else {
      return res.json({ redirect: "/login" });
    }
  });

  // router.post('/login', (req, res) => {
  //   const email = req.body.form.email;
  //   const password = req.body.form.password;
  //   const values = [email, password];
  //   let query = `
  //     SELECT * FROM users WHERE email = $1 and password = $2;
  //     `;

  //   db.query(query, values)
  //     .then((data) => {
  //       const user = data.rows;
  //       res.json({ user });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });

  return router;
};
