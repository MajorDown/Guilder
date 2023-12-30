import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  mail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  counter: { type: Number, required: true },
  guild: { type: String, required: true },
});

UserSchema.plugin(uniqueValidator);

// Utilisez `export default` pour exporter le modèle par défaut
const UserModel = mongoose.models.user || mongoose.model("user", UserSchema);
export default UserModel;

