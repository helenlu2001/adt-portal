const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  kerb: String, // array of userId's who are part of this dance
  videoId: String, // string for youtube id
  synch: Number
});

// compile model from schema
module.exports = mongoose.model("video", VideoSchema);
