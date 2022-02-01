var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local");
var CookieStrategy = require("passport-cookie");
var crypto = require("crypto");
var db = require("../db");

passport.use(
  new CookieStrategy(function (token, cb) {
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      function (err, row) {
        if (err) {
          return cb(err);
        }

        if (row.length === 0) {
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }

        if (password != row[0].password) {
          cb(null, false, { message: "Incorrect username or password." });
        }

        cb(null, row[0]);
      }
    );
  })
);

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      function (err, row) {
        if (err) {
          return cb(err);
        }

        if (row.length === 0) {
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }

        if (password != row[0].password) {
          cb(null, false, { message: "Incorrect username or password." });
        }

        cb(null, row[0]);
      }
    );
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  })
);
router.get("/logout", function (req, res, next) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
