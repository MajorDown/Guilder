import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const FactureSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    client: {
        name: { type: String, required: true },
        adress: {
            line1: { type: String, required: true },
            line2: { type: String, required: false },
            code: { type: Number, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true }
        },
        phone: { type: String, required: true },
        mail: { type: String, required: true }
    },
    package: {
        id: { type: Number, required: true },
        rules: {
            min: { type: Number, required: true },
            max: { type: Number, required: true }
        },
        price: { type: Number, required: true }
    },
    period: { type: String, required: true },
    firstMonth: { type: Number, required: true },
    reduction: {
        type: {
            unit: { type: String },
            value: { type: Number }
        },
        required: false,
        default: undefined 
    },
    sentToClient: { type: Boolean, required: true, default: false },
    status: { type: String, required: true, default: "pending" }
});

FactureSchema.plugin(uniqueValidator);

const FactureModel = mongoose.models.facture || mongoose.model("facture", FactureSchema);
export default FactureModel;
