const express = require("express");
const router = express();
const User = require("../models/User")
const Comment = require("../models/Comments")

router.post("/", (req, res) => {
  const { comment, receiver } = req.body;
  Comment.create({
    comment,
    sender: req.user._id,
    receiver
  })
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((error) => {
      res.json(error);
    });
});
router.get("/", (req, res) => {
  Comment.find()
    .then((comments) => {
      console.log(comments);
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;