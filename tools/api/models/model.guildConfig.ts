import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const GuildConfigSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  config: [
    {
      option: { type: String, required: true }, 
      coef: { type: Number, required: true },
      enabled: { type: Boolean, required: true }
    }
  ],
  rules: {
    type: [{ type: String }],
    required: false, 
  },
  adress: {
    type: {
      line1: { type: String, required: true },
      line2: { type: String, required: false},
      code: { type: Number, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true }
    }, 
    required: false
  },
  phone: { type: String, required: false },
  mail: { type: String, required: false },
  currentPackageId: { type: Number, required: true },
  currentPeriod: { type: String, required: true },
  currentPeriodStart: {type: Number, required: true }
});

GuildConfigSchema.plugin(uniqueValidator);

const GuildConfigModel = mongoose.models.guildConfig || mongoose.model("guildConfig", GuildConfigSchema);
export default GuildConfigModel;
