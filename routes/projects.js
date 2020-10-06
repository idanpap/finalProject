const express = require("express");
const router = express();
const Comments = require("../models/Comments");
const User = require("../models/User")

// get all the projects
router.get("/", (req, res) => {
  User.find()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      res.json(error);
    });
});

// get a specific project
router.get("/:id", async (req, res) => {
  let user = await User.findById(req.params.id)
  let comments = await Comments.find();
  res.status(200).json({user,comments})
});

// delete a project
router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      res.status(200).json({ message: "ok" });
    })
    .catch((error) => {
      res.json(error);
    });
});

// create a new project
router.post("/", (req, res) => {
  const { title, description } = req.body;
  User.create({
    title,
    description,
    owner: req.user._id,
  })
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      res.json(error);
    });
});

// update a project
router.put("/:id", (req, res) => {
  const { title, description } = req.body;
  User.findByIdAndUpdate(
    req.params.id,
    { title, description },
    { new: true }
  )
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
