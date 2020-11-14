const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  author: String, // links to the id of the user that wrote this comment
  video: String, // links to the id of the video that this comment is written for 
  comment: String,
  time: Number
});

// compile model from schema
module.exports = mongoose.model("comment", CommentSchema);
