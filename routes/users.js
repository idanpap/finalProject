const express = require("express");
const router = express();
const User = require("../models/User");

// get all the users
router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.json(error);
    });
});

// get a specific user
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json(user);
      } else {
        res.status(200).json(user);
      }
    })
    .catch((error) => {
      res.json(error);
    });
});

// delete a user
router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      res.status(200).json({ message: "ok" });
    })
    .catch((error) => {
      res.json(error);
    });
});

// create a new user
router.post("/", (req, res) => {
  const { title, description } = req.body;
  User.create({
    title,
    description,
    owner: req.user._id,
  })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.json(error);
    });
});

// update a user
router.put("/:id", (req, res) => {
  const { title, description } = req.body;
  User.findByIdAndUpdate(req.params.id, { title, description }, { new: true })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
