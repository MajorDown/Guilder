import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const OperationSchema = new mongoose.Schema({
  declarationDate: { type: Date, required: true, unique: true },
  date: { type: String, required: true},
  worker: { type: String, required: true },
  payer: { type: String, required: true },
  point: { type: Number, required: true },
  nature: { type: String, required: true },
});

OperationSchema.plugin(uniqueValidator);

const OperationModel = mongoose.models.operation || mongoose.model("operation", OperationSchema);
export default OperationModel;