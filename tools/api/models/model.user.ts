import mongoose from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  mail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: {type: Number, required: true, unique: true},
  counter: {type: Number, required: true},
  guild: {type: String, required: true}
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.models.user || mongoose.model("user", UserSchema);
