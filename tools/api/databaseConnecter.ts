import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

const connectOptions: ConnectOptions = {
  dbName: "guilder"
};

const databaseConnecter = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) return;
  try {
    if(process.env.MONGODB_URI) await mongoose.connect(process.env.MONGODB_URI, connectOptions);
    console.log("databaseConnecter ~> Connection à MongoDB établie");
    isConnected = true;
  } catch (error) {
    console.log("databaseConnecter ~> Error :", error);
  }
};

export default databaseConnecter;