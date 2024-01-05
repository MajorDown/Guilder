import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: {type: String, required: true},
  mail: { type: String, required: true, unique: true },
  guild: { type: String, required: true, unique: true },
  phone: { type: String, required: true }
});

AdminSchema.plugin(uniqueValidator);

const AdminModel = mongoose.models.admin || mongoose.model("admin", AdminSchema);
export default AdminModel;