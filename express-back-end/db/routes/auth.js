const express = require("express");
const router = express.Router();

module.exports = passport => {
  router.post(
    "/login_process",
    passport.authenticate("local"),
    { failureFlash: true, successFlash: true },
    (req, res) => {
      if (req.user) {
        req.user.redirect = "/";
        res.json(req.user);
      } else {
        res.json({ redirect: "/login" });
      }
    }
  );

  router.get("/logout", (req, res) => {
    req.logout();
    req.session.save(() => {
      res.redirect("/");
    });
  });

  return router;
};
