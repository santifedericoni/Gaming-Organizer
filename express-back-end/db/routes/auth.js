const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

module.exports = () => {
  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  const generateAccessToken = user => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15s",
    });
  };

  const generateRefreshToken = user => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  };

  router.post(
    // "/login_process",
    // passport.authenticate("local"),
    // (req, res) => {
    //   if (req.user) {
    //     req.user.redirect = "/";
    //     res.json(req.user);
    //   } else {
    //     res.json({ redirect: "/login" });
    //   }
    // }
    "/login",
    (req, res) => {
      const username = req.body.email;
      const user = { name: username };

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      refreshTokens.push(refreshToken);
      res.json({ accessToken, refreshToken });
    }
  );

  let refreshTokens = [];

  router.post("/token", (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken({ name: user.name });
      res.json({ accessToken });
    });
  });

  router.delete("/logout", (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);

    // req.logout();
    // req.session.save(() => {
    //   res.redirect("/");
    // });
  });

  return router;
};
