const express = require("express");

const Posts = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  Posts.getById(id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res
          .status(404)
          .json({ message: "Post Id is invalid; Post Id was not found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Server failed to process request." });
    });
}

module.exports = router;
