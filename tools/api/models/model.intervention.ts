import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const InterventionSchema = new mongoose.Schema({
  declarationDate: { type: String, required: true, unique: true},
  interventionDate: { type: String, required: true},
  description: { type: String, required: true},
  worker: { type: String, required: true},
  payer: { type: String, required: true},
  hours: { type: Number, required: true},
  options: [
    {
      option: {type: String, required: true}, 
      coef: {type: Number, required: true},
    }  
  ],
  imagesUrls: [ { type: String, required: false } ]
})

InterventionSchema.plugin(uniqueValidator);

const InterventionModel = mongoose.models.intervention || mongoose.model("intervention", InterventionSchema);
export default InterventionModel;