const express = require("express");
const router = express();
const User = require("../models/User");
const Comment = require("../models/Comments");

router.post("/", (req, res) => {
<<<<<<< HEAD
  const { comment, receiver, receiverUsername,senderUsername } = req.body;

=======
  const { comment, receiver, receiverUsername } = req.body;
  console.log("receiverUsername", receiverUsername);
>>>>>>> 3c8e95dd9d1b6c1edd4e406b343a1c2e5886f9e4
  Comment.create({
    comment,
    sender: req.user._id,
    receiver,
    receiverUsername,
<<<<<<< HEAD
    senderUsername
=======
>>>>>>> 3c8e95dd9d1b6c1edd4e406b343a1c2e5886f9e4
  })
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((error) => {
      res.json(error);
    });
});

// delete a project
router.delete("/:id", (req, res) => {
  console.log("hello frm the back end");
  Comment.findByIdAndDelete(req.params.id)
    .then((comment) => {
      res.status(200).json({ message: "ok" });
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
