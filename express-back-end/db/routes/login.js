const express = require("express");
const router = express.Router();
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

module.exports = db => {

  passport.use(
    new LocalStrategy(function (username, password, done) {
      // User.findOne({ username: username }, (err, user) => {
      //   if (err) {
      //     return done(err);
      //   }
      //   if (!user) {
      //     return done(null, false);
      //   }
      //   if (!user.verifyPassword(password)) {
      //     return done(null, false);
      //   }
      //   return done(null, user);
      // });
    })
  );

  router.post(
    "/login_process",
    passport.authenticate("local", { failureRedirect: "/" }),
    (req, res) => {
      console.log("login!!!!!!");
      res.redirect("/");
    }
  );

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
