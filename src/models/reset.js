const { Schema, model } = require("mongoose");

const resetSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const ResetModel = model("Reset", resetSchema);

module.exports = ResetModel;
