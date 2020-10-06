const express = require("express");
const router = express();
const User = require("../models/User")
const Comment = require("../models/Comments")

router.post("/", (req, res) => {
  const { comment, receiver, receiverUsername } = req.body;
  console.log("receiverUsername",receiverUsername);
  Comment.create({
    comment,
    sender: req.user._id,
    receiver,
    receiverUsername
  })
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get("/", async (req, res) => {
  let comments = await Comment.find();
  // let usersComments = await User.find();
  // console.log(usersComments);
  res.status(200).json(comments);

});

module.exports = router;