import { UserMail } from "@/types";
const jwt = require("jsonwebtoken");
import UserModel from "@/tools/api/models/model.user";

/**
 * crée un token JWT en utilisant l'adresse e-mail de l'utilisateur
 * comme donnée encodée. Le token est signé avec une clé secrète définie dans
 * les variables d'environnement.
 *
 * @param {UserMail} mail - L'adresse e-mail de l'utilisateur pour lequel le token est généré.
 * @returns {string} Le token JWT généré.
 */
export const tokenMaker = (mail: UserMail): string => {
  const token = jwt.sign({ mail }, process.env.JWT_SECRET);
  return token;
};

/**
 * Vérifie l'authenticité d'un token JWT et, si une adresse mail est renseigné en paramètre,
 * s'assure qu'il correspondent au même utilisateur
 *
 * @param {string} token - Le token JWT à vérifier.
 * @param {UserMail} [userMail] - (Optionnel) Une adresse e-mail spécifique à vérifier contre l'e-mail extrait du token.
 * @returns {Promise<boolean>} `true` si le token est valide (et, le cas échéant, correspond à l'adresse e-mail), sinon `false`.
 */
export const tokenChecker = async (token: string, userMail?: UserMail): Promise<boolean> => {
  try {
    if (!token) {
      throw new Error("tokenChecker ~> utilisateur non authentifié !");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const decodedMail = decodedToken.mail;
    const userToCheck = await UserModel.findOne({mail: decodedMail});
    if (!userToCheck) {
      throw new Error("tokenChecker ~> Utilisateur introuvable");
    }
    if (userMail && decodedMail != userMail) {
      throw new Error("tokenChecker ~> le mail rentré en paramètre ne corespond pas au mail de l'utilisateur authentitfié. Requète rejeté.")
    }
    console.log("tokenChecker ~> utilisateur authentitifé");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};


