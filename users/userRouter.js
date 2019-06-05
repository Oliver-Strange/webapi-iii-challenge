const express = require("express");

const UserDb = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  UserDb.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "failed to process request" });
    });
}

function validateUser(req, res, next) {
  if (req.body.name && Object.keys(req.body.name).length > 0) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "missing user data; or missing name field" });
  }
}

function validatePost(req, res, next) {
  if (req.body && Object.keys(req.body.text).length > 0) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "missing post data; or missing required text field" });
  }
}

module.exports = router;
