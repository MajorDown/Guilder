import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import createNewGuildAndAdmin from "@/tools/api/mongooseRequests/guild/createGuildAndAdmin";
import { tokenVerifier } from "@/tools/api/tokenManager";

export async function POST(request: Request) {
  console.log(`api/gestion/guildConfig/createNewGuildAndAdmin ~> Requête de création de guilde + admin`);

  try {
    // CONNEXION À LA BASE DE DONNÉES
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
    // RÉCUPÉRATION DES DONNÉES DU BODY
    const { newGuild, newAdmin } = await request.json();
    if (!newGuild || !newAdmin) {
      return NextResponse.json("Paramètres manquants", { status: 400 });
    }
    // TRAITEMENT PRINCIPAL
    await createNewGuildAndAdmin({ newGuild, newAdmin });
    return NextResponse.json("Guilde et administrateur créés avec succès", { status: 200 });
  } catch (error: any) {
    // GESTION DES ERREURS
    console.error(`api/gestion/guildConfig/createNewGuildAndAdmin ~> erreur :`, error);
    return NextResponse.json(error.message || "Échec de la création", { status: 500 });
  }
}
