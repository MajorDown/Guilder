import { NextResponse } from "next/server";
import { databaseConnecter } from "@/tools/api/databaseConnecter";
const UserModel = require("@/tools/api/models/model.user");
import { passwordCrypter } from "@/tools/api/passwordManager";
import { User } from "@/types";

export const POST = async (request: Request) => {
  const { name, password, mail, phone, counter, guild } = await request.json();
  console.log(
    "api/user/signup ~> Tentative d'inscription via l'adresse mail :",
    mail
  );
  try {
    await databaseConnecter();
    // VERIFICATION SI L'UTILISATEUR EXISTE DEJA
    const existingUser: User = await UserModel.findOne({
      mail: mail,
    });
    if (existingUser) {
      return NextResponse.json("Cet utilisateur existe déjà", { status: 400 });
    }
    // CRYPTAGE DU MOT DE PASSE
    const hashedpassword = await passwordCrypter(password);
    // CREATION DE L'UTILISATEUR
    const newUser = new UserModel({
      name: name,
      password: hashedpassword,
      mail: mail,
      phone: phone,
      counter: counter,
      guild: guild
    });
    // SAUVEGARDE DE L'UTILISATEUR
    await newUser.save();
    console.log("api/user/signup ~> nouvel utilisateur créé :", name);
    // RENVOI DE L'UTILISATEUR
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    // SI ERREUR
    console.log("api/user/signup ~> error :", error);
    return NextResponse.json("failed to signup", { status: 500 });
  }
};
