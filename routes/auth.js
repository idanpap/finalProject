const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  const {
    username,
    password,
    languagesSpoken,
    languagesToLearn,
    description,
  } = req.body;
  console.log("this req.body in signup", req.body);

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Your password must be 8 chars minimum" });
  }
  if (username === "") {
    return res.status(400).json({ message: "Your username cannot be empty" });
  }
  // check if username exists in database -> show message
  User.findOne({ username: username }).then((found) => {
    if (found !== null) {
      return res
        .status(400)
        .json({ message: "Your username is already taken" });
    } else {
      // hash the password, create the user and redirect to profile page
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      User.create({
        username: username,
        password: hash,
        languagesSpoken: languagesSpoken,
        languagesToLearn: languagesToLearn,
        description: description,
      })
        .then((dbUser) => {
          // login with passport:
          req.login(dbUser, (err) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Error while attempting to login" });
            }
            return res.status(200).json(dbUser);
          });
        })
        .catch((err) => {
          res.json(err);
        });
    }
  });
});

router.post("/login", (req, res) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" });
    }
    if (!user) {
      return res.status(400).json({ message: "Wrong credentials" });
    }
    req.login(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error while attempting to login" });
      }
      return res.status(200).json(user);
    });
  })(req, res);
});

router.delete("/logout", (req, res) => {
  // logout the user using passport
  req.logout();
  res.json({ message: "Succesful Logout" });
});

router.get("/loggedin", (req, res) => {
  res.json(req.user);
});

module.exports = router;
