import { UserMail } from "@/types";
const jwt = require("jsonwebtoken");
const UserModel = require("/models/model.user");

// GENERER LE TOKEN JWT
const tokenMaker = (mail: UserMail): string => {
  const token = jwt.sign({ mail }, process.env.JWT_SECRET);
  return token;
};

// VERIFIER LE TOKEN JWT
const tokenChecker = async (token: string): Promise<boolean> => {
  try {
    if (!token) {
      throw new Error("tokenChecker ~> utilisateur non authentifié !");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const userToCheck = await UserModel.findById(userId);
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

module.exports = { tokenMaker, tokenChecker };
