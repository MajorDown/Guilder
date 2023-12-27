import { UserMail } from "@/types";
const jwt = require("jsonwebtoken");
import UserModel from "@/tools/api/models/model.user";

// GENERER LE TOKEN JWT
export const tokenMaker = (mail: UserMail): string => {
  const token = jwt.sign({ mail }, process.env.JWT_SECRET);
  return token;
};

// VERIFIER LE TOKEN JWT
export const tokenChecker = async (token: string): Promise<boolean> => {
  try {
    if (!token) {
      throw new Error("tokenChecker ~> utilisateur non authentifié !");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const mail = decodedToken.mail;
    const userToCheck = await UserModel.findOne({mail: mail});
    if (!userToCheck) {
      throw new Error("tokenChecker ~> Utilisateur introuvable");
    }
    console.log("tokenChecker ~> requète autorisé");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};


