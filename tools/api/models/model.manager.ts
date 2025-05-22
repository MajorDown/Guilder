import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const ManagerSchema = new mongoose.Schema({
  password: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
});

ManagerSchema.plugin(uniqueValidator);

const ManagerModel = mongoose.models.manager || mongoose.model("manager", ManagerSchema);
export default ManagerModel;