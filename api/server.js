require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");

const postsRouter = require("../posts/postRouter");
const userRouter = require("../users/userRouter");

const server = express();

// Global Middleware
server.use(express.json());
server.use(helmet());
server.use(logger("dev"));
server.use(methodLogger);

// Route Handlers
server.use("/api/posts", postsRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's test our api on Heroku!</h2>`);
});

//custom middleware

function methodLogger(req, res, next) {
  console.log(`${req.method} Request. ${Date.now()}`);
  next();
}

module.exports = server;
