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
    required: false, // le tableau lui-même est facultatif
  }
});

GuildConfigSchema.plugin(uniqueValidator);

const GuildConfigModel = mongoose.models.guildConfig || mongoose.model("guildConfig", GuildConfigSchema);
export default GuildConfigModel;
