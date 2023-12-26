import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

const connectOptions: ConnectOptions = {
  dbName: "guilder"
};

export const databaseConnecter = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) return;
  try {
    if(process.env.MONGODB_URI) await mongoose.connect(process.env.MONGODB_URI, connectOptions);
    console.log("connectToDB ~> Connection à MongoDB établie");
    isConnected = true;
  } catch (error) {
    console.log("connectToDB ~> Error :", error);
  }
};
