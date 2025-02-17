import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import GuildConfigModel from "@/tools/api/models/model.guildConfig";
import { UserStatus } from "@/types";
import authentifier from "@/tools/api/authentifier";

export async function GET(request: Request) {
  console.log(`api/guildConfig/get ~> Requète de récupération de guildConfig`);
  try {
    // CONNEXION A LA DB
    await databaseConnecter();
    // VERIFICATION DE LA PRESENCE DES DONNEES DANS LA REQUETE
    const url = new URL(request.url);
    const guildName = url.searchParams.get("guildName");
    const userMail = request.headers.get('X-user-Email');
    const role = request.headers.get('X-user-Role') as UserStatus;
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!guildName || !userMail || !role || !token) {
        console.log(`api/guildConfig/get ~> données manquantes`);
        return NextResponse.json("Données manquantes", { status: 400 });
    }
    // VERIFICATION DE l'AUTHENTIFICATION
    const authResponse = await authentifier({
      model: role,
      token: token,
      userMail: userMail,
      guildToCheck: guildName
    });  
    if (!authResponse.authorized) {
      console.log(`api/guildConfig/get ~> ${authResponse.error}`);
      return NextResponse.json(authResponse.error, { status: 401 });
    }
    // VERIFICATION DE L'EXISTENCE DE LA GUILDE
    const guildConfigToGet = await GuildConfigModel.findOne({name: guildName}).lean();
    if (!guildConfigToGet) {
      console.log(`api/guildConfig/get ~> guilde ${guildName} introuvable`);
      return NextResponse.json("Guilde introuvable", { status: 404 });
    }
    // RENVOI DE LA GUILDE CONFIG
    return NextResponse.json(guildConfigToGet, { status: 200 });
  }
  catch (error) {
    // SI ERREUR
      console.log(`api/guildConfig/get/ ~> error :`, error);
      return NextResponse.json("Echec de chargement des membres de la guilde", { status: 500 });
  }
};