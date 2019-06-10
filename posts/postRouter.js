const express = require("express");

const PostDb = require("./postDb");

const router = express.Router();

// GET POSTS - works
router.get("/", async (req, res) => {
  try {
    const posts = await PostDb.get(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error retrieving posts" });
  }
});

// GET POST BY ID - works
router.get("/:id", validatePostId, async (req, res) => {
  try {
    const post = await PostDb.getById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error retrieving post" });
  }
});

// DELETE POST - works
router.delete("/:id", validatePostId, async (req, res) => {
  try {
    const count = await PostDb.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "Post DELETED" });
    } else {
      res.status(404).json({ message: "Post could not be found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error removing post" });
  }
});

// PUT/UPDATE POST - works
router.put("/:id", validatePostId, async (req, res) => {
  try {
    const post = await PostDb.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post could not be found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error updating post" });
  }
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  PostDb.getById(id)
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
