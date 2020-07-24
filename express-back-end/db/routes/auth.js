const router = require("express").Router();
const passport = require("../../config/passport");
const jwt = require("jsonwebtoken");

module.exports = db => {
  // const authenticateToken = (req, res, next) => {
  //   const authHeader = req.headers["authorization"];
  //   const token = authHeader && authHeader.split(" ")[1];
  //   if (!token) return res.sendStatus(401);

  //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //     if (err) return res.sendStatus(403);
  //     req.user = user;
  //     next();
  //   });
  // };

  // const generateAccessToken = user => {
  //   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
  //     expiresIn: "15s",
  //   });
  // };

  // const generateRefreshToken = user => {
  //   return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  // };

  // router.post(
  //   // "/login_process",
  //   // passport.authenticate("local"),
  //   // (req, res) => {
  //   //   if (req.user) {
  //   //     req.user.redirect = "/";
  //   //     res.json(req.user);
  //   //   } else {
  //   //     res.json({ redirect: "/login" });
  //   //   }
  //   // }
  //   "/getToken",
  //   (req, res) => {
  //     const username = req.body.email;
  //     const user = { name: username };

  //     const accessToken = generateAccessToken(user);
  //     const refreshToken = generateRefreshToken(user);
  //     refreshTokens.push(refreshToken);
  //     res.json({ accessToken, refreshToken });
  //   }
  // );

  router.post("/getToken", (req, res) => {
    // validation

    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(401).send("no fields");
    }
    // build db query and execute
    let query = `
            SELECT * FROM users WHERE email = $1;
            `;

    db.query(query, [email]).then(data => {
      if (!data.rows[0]) {
        return res.status(400).send("user not found");
      }
      let query = `SELECT * FROM users WHERE email = $1 and password = $2`;
      db.query(query, [email, password])
        .then(user => {
          if (!user.rows[0]) {
            return res.status(401).send("invalid password");
          }
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

  router.get(
    "/getUser",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      return res.send(req.user.rows[0]);
    }
  );

  // let refreshTokens = [];

  // router.post("/token", (req, res) => {
  //   const refreshToken = req.body.token;
  //   if (!refreshToken) return res.sendStatus(401);
  //   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  //   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
  //     if (err) return res.sendStatus(403);
  //     const accessToken = generateAccessToken({ name: user.name });
  //     res.json({ accessToken });
  //   });
  // });

  router.delete("/logout", (req, res) => {
    // refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    // res.sendStatus(204);
    // req.logout();
    // req.session.save(() => {
    //   res.redirect("/");
    // });
  });

  return router;
};
