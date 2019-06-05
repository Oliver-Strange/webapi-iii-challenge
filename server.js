const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");

const postsRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

const server = express();

// Global Middleware
server.use(express.json());
server.use(helmet());
server.use(logger("dev"));
server.use(methodLogger);

// Route Handlers
server.use("/api/posts", postsRouter);
server.use("/api/user", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function methodLogger(req, res, next) {
  console.log(`${req.method} Request. ${Date.getTime()}`);
  next();
}

module.exports = server;
