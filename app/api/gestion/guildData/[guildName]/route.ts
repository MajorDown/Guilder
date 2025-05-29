import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenVerifier } from "@/tools/api/tokenManager";
import getAllDataByGuild from "@/tools/api/mongooseRequests/guild/getAllDataByGuild";

export async function GET(request: Request, { params }: { params: { guildName: string } }) {
  console.log(`api/gestion/guildData/[guildName] ~> Requète de récupération des noms de chaque guilde`);
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
    const guildData = await getAllDataByGuild({ guildName: params.guildName });
    if (!guildData) {
      return NextResponse.json("Aucune donnée trouvée pour cette guilde", { status: 404 });
    }
    return NextResponse.json(guildData, { status: 200 });
  }
  catch (error) {
    // SI ERREUR
      console.log(`api/gestion/guildData/[guildName] ~> error :`, error);
      return NextResponse.json("Echec de chargement des data de la guilde", { status: 500 });
  }
};