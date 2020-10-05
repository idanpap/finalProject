const express = require("express");
const router = express();
const Project = require("../models/Project");
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
router.get("/:id", (req, res) => {
  console.log("here");
  User.findById(req.params.id)
    .then((project) => {
      console.log("project in projectsJS",project)
      if (!project) {
        res.status(404).json(project);
      } else {
        res.status(200).json(project);
      }
    })
    .catch((error) => {
      res.json(error);
    });
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
