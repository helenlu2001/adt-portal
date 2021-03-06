/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Dance = require("./models/dance");
const Comment = require("./models/comment");
const Video = require("./models/video");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.get("/users", (req, res) => {
  User.find({}).then((users) => {
    res.send(users.map((elem) => elem.kerb));
  });
})

router.get("/dancers", (req, res) => {
  User.find({"dances": "God's Menu"}).then((users) => {
    res.send(users);
  });
})

router.get("/video", (req, res) => {
  Video.findOne({kerb: req.query.kerb}).then((user) => {
    res.send(user);
  });
})

router.post("/synch", (req, res) => {
  Video.findOneAndUpdate({kerb: req.body.kerb}, {synch: req.body.synch}).then((vid) => {
    console.log(vid);
  });
})


router.get("/comment", (req, res) => {
  Comment.find({video: req.query.video, kerb: req.query.kerb})
    .then( (comments) => {
      res.send(comments);
    });
})

router.post("/removeComment", (req, res) => {
  console.log(req.body.video);
  console.log(req.body.kerb);
  console.log(req.body.comment);
  Comment.deleteOne({video: req.body.video, kerb: req.body.kerb, comment: req.body.comment}).then((comment) => {console.log(comment)});
  console.log('should remove');

})

router.post("/comment", (req, res) => {
  console.log(req.body.author);
  const newComment = new Comment({
    author: req.body.author,
    kerb: req.body.kerb,
    video: req.body.video,
    comment: req.body.comment,
    time: req.body.time
  });
  newComment.save().then((comment) => console.log(comment));
})


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
