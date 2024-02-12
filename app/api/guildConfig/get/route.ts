import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import AdminModel from "@/tools/api/models/model.admin";
import MemberModel from "@/tools/api/models/model.member";
import GuildConfigModel from "@/tools/api/models/model.guildConfig";
import { UserStatus } from "@/types";

export async function GET(request: Request) {
  console.log(`api/guildConfig/get ~> Requète de récupération de guildConfig`);
  try {
    const url = new URL(request.url);
    const guildName = url.searchParams.get("guildName");
    if (!guildName) {
      console.log(`api/guildConfig/get ~> Nom de guilde manquant dans la requète`);
      return NextResponse.json("Nom de guilde manquant", { status: 400 });
    }
    // CONNEXION A LA DB
    await databaseConnecter();
    // VERIFICATION DE L'EXISTENCE DE LA GUILDE
    const guildConfigToGet = await GuildConfigModel.findOne({name: guildName});
    if (!guildConfigToGet) {
        console.log(`api/guildConfig/get ~> la guilde ${guildName} n'existe pas dans la db`);
        return NextResponse.json("Non autorisé", { status: 401 });      
    }
    // AUTHENTIFICATION
    const role = request.headers.get('X-user-Role') as UserStatus;
    const userMail = request.headers.get('X-user-Mail');
    let userToCheck;
    if (role === "admin") userToCheck = await AdminModel.findOne({mail: userMail});
    else userToCheck = await MemberModel.findOne({mail: userMail});
    if (!userToCheck) {
      console.log(`api/guildConfig/get ~> ${userMail} est introuvable dans la guilde ${guildName}`);
      return NextResponse.json("Non autorisé", { status: 401 });      
    }
    const authHeader = request.headers.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    const isAuthentified = token ? await tokenChecker(role, token, userToCheck.mail) : false;
    if (!isAuthentified) {
      console.log(`api/guildConfig/get ~> l'utilisateur ${userMail} a échoué son authentification`);
      return NextResponse.json("Non autorisé", { status: 401 });
    }    
    // RECUPERATION DES DONNNES
    return NextResponse.json(guildConfigToGet, { status: 200 });
  }
  catch (error) {
    // SI ERREUR
      console.log(`api/guildConfig/get/ ~> error :`, error);
      return NextResponse.json("Echec de chargement des membres de la guilde", { status: 500 });
  }
};