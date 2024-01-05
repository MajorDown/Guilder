import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import AdminModel from "@/tools/api/models/model.admin";
import UserModel from "@/tools/api/models/model.user";
import { passwordCrypter } from "@/tools/api/passwordManager";
import { User } from "@/types";

export async function POST(request: Request) {
  const { name, password, mail, phone, guild } = await request.json();
  console.log(
    "api/user/signup ~> Tentative d'inscription via l'adresse mail :",
    mail
  );
  try {
    await databaseConnecter();
    // VERIFICATION SI L'UTILISATEUR EXISTE DEJA
    const existingUser: User | null = await UserModel.findOne({
      mail: mail,
    });
    if (existingUser) {
      console.log(
        "api/user/signup ~> Utilisateur déjà enregistré :",
        mail
      );
      return NextResponse.json("Cet utilisateur existe déjà", { status: 400 });
    }
    // VERIFICATION DE L'EXISTENCE DE LA GUILDE
    const existingGuild = await AdminModel.findOne({guild});
    if (!existingUser) {
      console.log(
        "api/user/signup ~> nom de guilde inexistant :",
        mail
      );
      return NextResponse.json("nom de guilde inexistant", { status: 400 });
    }
    // CRYPTAGE DU MOT DE PASSE
    const hashedpassword = await passwordCrypter(password);
    // CREATION DE L'UTILISATEUR
    const newUser = new UserModel({
      name: name,
      password: hashedpassword,
      mail: mail,
      phone: phone,
      counter: 0,
      guild: guild
    });
    // SAUVEGARDE DE L'UTILISATEUR
    await newUser.save();
    console.log("api/user/signup ~> nouvel utilisateur créé :", name);
    console.log("api/user/signup ~> au sein de la guilde ", guild)
    // RENVOI DE L'UTILISATEUR
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    // SI ERREUR
    console.log("api/user/signup ~> error :", error);
    return NextResponse.json("failed to signup", { status: 500 });
  }
};
