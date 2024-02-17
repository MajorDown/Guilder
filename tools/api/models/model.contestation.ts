import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const ContestationSchema = new mongoose.Schema({
  contestationDate: { type: String, required: true, unique: true},
  contester: { type: String, required: true},
  contesterMessage: { type: String, required: true},
  contestedIntervention: { type: Object, required: true},
  adminConclusion: { type: String, required: true},
  adminMessage: { type: String, required: false},
  guild: { type: String, required: true},
})

ContestationSchema.plugin(uniqueValidator);

const ContestationModel = mongoose.models.contestation || mongoose.model("contestation", ContestationSchema);
export default ContestationModel;