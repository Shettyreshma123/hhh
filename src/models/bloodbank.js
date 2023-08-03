const mongoose = require("mongoose");

const bloodbankSchema = mongoose.Schema({
  bloodgroup: {
    type: String,
    required: true,
  },
  noofbags: {
    type: Number,
    default: 0, // Set a default value or remove the "required" property
  },
});

module.exports = mongoose.model("bloodbank", bloodbankSchema);
