var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var FileStore = require('session-file-store')(session);

var app = express()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))

const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;



app.get('/', function (req, res, next) {
  if (req.session.num === undefined) {
    req.session.num = 1;
  } else {
    req.session.num += 1;
  }
  res.send(`Views: ${req.session.num}`);
})

app.listen(3000, function() {
  console.log('3000!');
})