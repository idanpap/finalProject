const express = require("express");
const router = express();
const User = require("../models/User")
const Comment = require("../models/Comments")

router.post("/comment", (req, res) => {
  const { comment } = req.body;
  Comments.create({
    comment,
    sender: req.user._id,
  })
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((error) => {
      res.json(error);
    });
});


module.exports = router;