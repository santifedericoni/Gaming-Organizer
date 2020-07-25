const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};
const db = require("../db/index");

const strategy = new JwtStrategy(options, (payload, done) => {
  let query = `SELECT * FROM users WHERE id = $1`;
  db.query(query, [payload.id])
    .then(user => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(err => done(err, null));
});

module.exports = passport => {
  passport.use(strategy);
};
