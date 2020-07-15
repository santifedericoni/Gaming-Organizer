const express = require("express");
const router = express.Router();

module.exports = db => {
  const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;

  router.use(passport.initialize());
  router.use(passport.session());

  passport.serializeUser((user, done) => {
    // done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // User.findById(id, function(err, user) {
    //   done(err, user);
    // });
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
            if (!data.rows.length) {
              return done(null, false, { msg: "Invalid email or password" });
            }
            console.log(data.rows[0]);
            return done(null, data.rows[0]);
          })
          .catch(err => {
            return done(err);
          });
      }
    )
  );

  router.post("/login_process", passport.authenticate("local"), (req, res) => {
    const path = {};
    if (req.user) {
      path.redirect = "/";
    } else {
      path.redirect = "/login";
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
