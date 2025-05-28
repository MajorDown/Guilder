import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenVerifier } from "@/tools/api/tokenManager";
import getAllGuildConfig from "@/tools/api/mongooseRequests/guild/getAllGuildConfig";

export async function GET(request: Request) {
  console.log(`api/gestion/guildConfig/getAll ~> Requète de récupération de chaque guildConfig`);
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
    const isValid = tokenVerifier(managerMail, token);
    if (!isValid) {
      return NextResponse.json("Authentification invalide", { status: 403 });
    }
    // RECUPERATION DES DONNNES
    const guildConfigs = await getAllGuildConfig();
    return NextResponse.json(guildConfigs, { status: 200 });
  }
  catch (error) {
    // SI ERREUR
      console.log(`api/gestion/guildConfig/getAll ~> error :`, error);
      return NextResponse.json("Echec de chargement de chaque guildConfig", { status: 500 });
  }
};