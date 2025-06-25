import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import AdminModel from "@/tools/api/models/model.admin";
import { passwordCrypter } from "@/tools/api/passwordManager";
import { Admin, Guild } from "@/types";
import GuildConfigModel from "@/tools/api/models/model.guildConfig";

export async function POST(request: Request) {
  const { name, password, mail, phone, guild } = await request.json();
  console.log(
    "api/admin/signup ~> Tentative de création de guilde via l'adresse mail :",
    mail
  );
  try {
    await databaseConnecter();
    // VERIFICATION SI L'UTILISATEUR EXISTE DEJA
    const existingAdmin: Admin | null = await AdminModel.findOne({mail: mail});
    if (existingAdmin) {
      console.log(
        "api/admin/signup ~> Ce mail est déjà utilisé pour gérer une autre guilde :",
        mail
      );
      return NextResponse.json("mail déjà utilisé pour une autre guilde", { status: 400 });
    }
    // VERIFICATION SI LA GUILDE N'EXISTE PAS DEJA
    const existingGuild: Guild | null = await AdminModel.findOne({guild: guild})
    if (existingGuild) {
        console.log(
            "api/admin/signup ~> Cette guilde existe déjà :",
            mail
          );
          return NextResponse.json("guilde déjà existante", { status: 400 });        
    }
    // CRYPTAGE DU MOT DE PASSE
    const hashedpassword = await passwordCrypter(password);
    // CREATION DE L'UTILISATEUR
    const newAdminData: Admin = {
      name: name,
      password: hashedpassword,
      mail: mail,
      phone: phone,
      guild: guild
    }
    const newAdmin = new AdminModel(newAdminData);
    // SAUVEGARDE DE L'UTILISATEUR
    await newAdmin.save();
    console.log("api/admin/signup ~> nouvelle guilde créé :", guild, "par", name);
    // CREATION DE LA CONFIGURATION DE LA GUILDE
    const newGuildConfig = new GuildConfigModel({
        name: guild,
        config: [],
        rules: []
      });
    // SAUVEGARDE DE LA CONFIGURATION DE LA GUILDE
    await newGuildConfig.save();
    console.log("api/admin/signup ~> nouvelle config créé pour la guilde", guild);
    // RENVOI DE L'UTILISATEUR
    return NextResponse.json(newAdmin, { status: 201 });
  } catch (error) {
    // SI ERREUR
    console.log("api/admin/signup ~> error :", error);
    return NextResponse.json("failed to create Guilde", { status: 500 });
  }
};
