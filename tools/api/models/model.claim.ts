import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const ClaimSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    claimer: {type: String, required: true},
    claimerRole: {type: String, required: true},
    guild: {type: String, required: true},
    message: {type: String, required: true},
    category: {type: String, required: true},
    status: {type: String, required: true},
    contactMethod: {type: String, required: true}
});

ClaimSchema.plugin(uniqueValidator);

const ClaimModel = mongoose.models.claim || mongoose.model("claim", ClaimSchema);
export default ClaimModel;
