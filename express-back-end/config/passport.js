const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};
const db = require("../db/index");

const strategy = new JwtStrategy(options, (payload, next) => {
  let query = `SELECT * FROM users WHERE id = $1`;
  console.log("payload id: ", payload.id);
  db.query(query, [payload.id]).then(res => {
    console.log("resssss: ", res.rows[0]);
    next(null, res);
  });
});

passport.use(strategy);

module.exports = passport;
// const passport = require("passport"),
//   LocalStrategy = require("passport-local").Strategy;

// // initialize passport and use session
// app.use(passport.initialize());
// app.use(passport.session());

// // serialize user data with session only once when logged in
// passport.serializeUser((user, done) => {
//   console.log("serialize: ", user);
//   done(null, user.email);
// });

// // deserialize user data with session
// passport.deserializeUser((id, done) => {
//   console.log("deserialize: ", id);

//   let query = `
//           SELECT * FROM users WHERE email = $1;
//           `;

//   db.query(query, [id])
//     .then(data => {
//       console.log(data.rows[0]);
//       done(null, data.rows[0]);
//     })
//     .catch(err => {
//       done(err, null);
//     });
// });

//   passport.use(
//     new LocalStrategy(
//       {
//         usernameField: "email",
//         passwordField: "password",
//       },
//       // create db query
//       (username, password, done) => {
//         const values = [username, password];
//         let query = `
//             SELECT * FROM users WHERE email = $1 and password = $2;
//             `;

//         // return right 'done' calls to passportjs depending on the result
//         db.query(query, values)
//           .then(data => {
//             if (!data.rowCount) {
//               return done(null, false, { msg: "Invalid email or password" });
//             }
//             // when there is a matching user data, this is sent to 'user' in serializing
//             return done(null, data.rows[0]);
//           })
//           .catch(err => {
//             return done(err);
//           });
//       }
//     )
//   );
//   return passport;
// };
