import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import GuildConfigModel from "@/tools/api/models/model.guildConfig";
import { GuildConfig } from "@/types";

export async function GET(request: Request) {
  console.log(`api/god/guildsName/getAll ~> Requète de récupération des noms de chaque guilde`);
  try {
    // CONNEXION A LA DB
    await databaseConnecter();
    // AUTHENTIFICATION
    const IsGodConnected = request.headers.get('X-IsGodConnected') as String;
    if (!IsGodConnected  || IsGodConnected !== "true") {
      console.log(`api/god/guildsName/getAll ~> God non connecté`);
      return NextResponse.json("Non autorisé", { status: 401 });
    }    
    // RECUPERATION DES DONNNES
    let guildsName:any = await GuildConfigModel.find().select("name");
    guildsName = guildsName.map((guild: GuildConfig) => guild.name);
    return NextResponse.json(guildsName, { status: 200 });
  }
  catch (error) {
    // SI ERREUR
      console.log(`api/god/guildsName/getAll ~> error :`, error);
      return NextResponse.json("Echec de chargement des membres de la guilde", { status: 500 });
  }
};