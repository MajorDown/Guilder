import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  guild: { type: String, required: true,},
  phone: { type: String, required: true },
  counter: {type: Number, required: true,},
});

MemberSchema.plugin(uniqueValidator);

const MemberModel = mongoose.models.member || mongoose.model("member", MemberSchema);
export default MemberModel;