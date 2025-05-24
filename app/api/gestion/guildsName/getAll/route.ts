import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import GuildConfigModel from "@/tools/api/models/model.guildConfig";
import { GuildConfig } from "@/types";
import { tokenVerifier } from "@/tools/api/tokenManager";

export async function GET(request: Request) {
  console.log(`api/gestion/guildsName/getAll ~> Requète de récupération des noms de chaque guilde`);
  try {
    // CONNEXION A LA DB
    await databaseConnecter();
    // AUTHENTIFICATION
    const managerMail = request.headers.get('X-Manager-Email');
    const authHeader = request.headers.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!managerMail || !token) {
      return NextResponse.json("Authentification requise", { status: 401 });
    }
    const isValid = await tokenVerifier(managerMail, token);
    if (!isValid) {
      return NextResponse.json("Authentification invalide", { status: 403 });
    }
    // RECUPERATION DES DONNNES
    let guildsName:any = await GuildConfigModel.find().select("name");
    guildsName = guildsName.map((guild: GuildConfig) => guild.name);
    return NextResponse.json(guildsName, { status: 200 });
  }
  catch (error) {
    // SI ERREUR
      console.log(`api/gestion/guildsName/getAll ~> error :`, error);
      return NextResponse.json("Echec de chargement des noms de chaque guilde", { status: 500 });
  }
};