const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  kerb: String,
  first: String,
  last: String,
  dances: Array
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
