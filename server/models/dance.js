const mongoose = require("mongoose");

const DanceSchema = new mongoose.Schema({
  title: String,
  choreogs: Array, // array of userId's who are choreogs of this dance
  dancers: Array, // array of userId's who are part of this dance
});

// compile model from schema
module.exports = mongoose.model("dance", DanceSchema);
