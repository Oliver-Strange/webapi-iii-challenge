const express = require("express");

const UserDb = require("./userDb");
const PostDb = require("../posts/postDb");

const router = require("express").Router();

// POST USER - works
router.post("/", validateUser, async (req, res) => {
  try {
    const user = await UserDb.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error adding user" });
  }
});

// POST/ADD USER'S POST BY USER ID
router.post("/:id/posts", validatePost, async (req, res) => {
  try {
    const post = PostDb.insert(req.body);
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error adding post" });
  }
});

// GET USERS - works
router.get("/", async (req, res) => {
  try {
    const users = await UserDb.get(req.query);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error retrieving user" });
  }
});

// GET USER BY ID - works
router.get("/:id", validateUserId, async (req, res) => {
  try {
    const user = await UserDb.getById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error retrieving User" });
  }
});

// GET USER POSTS BY USER ID - works
router.get("/:id/posts", validateUserId, async (req, res) => {
  try {
    const posts = await UserDb.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error retrieving posts" });
  }
});

// USER DELETE - works
router.delete("/:id", validateUserId, async (req, res) => {
  try {
    const count = await UserDb.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "User DELETED" });
    } else {
      res.status(404).json({ message: "User could not be found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error removing user" });
  }
});

// USER PUT - works
router.put("/:id", validateUserId, async (req, res) => {
  try {
    const user = await UserDb.update(req.params.id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User could not be found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error updating user" });
  }
});

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
  if (req.body.text && Object.keys(req.body.text).length > 0) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "missing post data; or missing required text field" });
  }
}

module.exports = router;
