import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

const connectOptions: ConnectOptions = {
  dbName: "guilder"
};

const databaseConnecter = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("databaseConnecter ~> Serveur déjà connecté à MongoDB");    
    return
  };
  try {
    if(process.env.MONGODB_URI) await mongoose.connect(process.env.MONGODB_URI, connectOptions);
    console.log("databaseConnecter ~> Connexion à MongoDB établie");
    isConnected = true;
  } catch (error) {
    console.log("databaseConnecter ~> Error :", error);
  }
};

export default databaseConnecter;