const router = require("express").Router();
const passport = require("../../config/passport");
const jwt = require("jsonwebtoken");

module.exports = db => {
  // validation and issue JWT
  router.post("/getToken", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(401).send("no fields");
    }
    // build db query and execute
    let emailChkQuery = `
            SELECT * FROM users WHERE email = $1;
            `;

    db.query(emailChkQuery, [email]).then(data => {
      if (!data.rows[0]) {
        return res.status(401).send("user not found");
      }
      let pwdChkQuery = `SELECT * FROM users WHERE email = $1 and password = $2`;
      db.query(pwdChkQuery, [email, password])
        .then(user => {
          if (!user.rows[0]) {
            return res.status(401).send("invalid password");
          }
          // create and send JWT
          const payload = { id: user.rows[0].id };
          const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
          res.send(token);
        })
        .catch(err => {
          return res.status(401).send({ err });
        });
    });
  });

  router.get(
    "/protected",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.send("i'm authenticated");
    }
  );

  // check if userid exists in payload. Check auth status for every user HTTP request
  router.get(
    "/getUser",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      return res.send(req.user.rows[0]);
    }
  );

  // remove JWT upon logout
  router.delete("/logout", (req, res) => {
    // refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
    req.logout();
  });

  return router;
};
