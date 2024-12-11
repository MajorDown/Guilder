import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import clearAllCollections from "@/tools/api/mongooseRequests/clearAllCollections";
import recoverAllCollections from "@/tools/api/mongooseRequests/recoverAllCollections";

export async function POST(request: Request) {
  console.log(`api/god/uploadBackup ~> Requète de restockage des données de chaque guilde`);
  const {data} = await request.json();
  try {
    // CONNEXION A LA DB
    await databaseConnecter();
    // AUTHENTIFICATION
    const IsGodConnected = request.headers.get('X-IsGodConnected') as String;
    if (!IsGodConnected  || IsGodConnected !== "true") {
      console.log(`api/god/uploadBackup ~> God non connecté`);
      return NextResponse.json("Non autorisé", { status: 401 });
    }
    // VERIFICATION DE DATA
    if (!data || !data.admins || !data.members || !data.guildsConfig || !data.interventions || !data.contestations) {
        console.log(`api/god/uploadBackup ~> data manquant`);
        return NextResponse.json("Data manquant", { status: 400 });
    }
    // EFFACER TOUTE LES DONNEES DE CHAQUE COLLECTIONS
    const deleteCollections = await clearAllCollections();
    if (!deleteCollections) {
        console.log(`api/god/uploadBackup ~> Echec de suppression des data en vue de les remplacer`);
        return NextResponse.json("Echec de suppression des data en vue de les remplacer", { status: 500 });
    }
    // SAUVEGARDER LES NOUVELLES DONNEES
    const recoverCollections = await recoverAllCollections(data);
    if (!recoverCollections) {
        console.log(`api/god/uploadBackup ~> Echec de restockage des data`);
        return NextResponse.json("Echec de restockage des data", { status: 500 });
    }
    // RETOURNER UN MESSAGE DE SUCCES
    return NextResponse.json({ status: 200 });
  }
  catch (error) {
    // SI ERREUR
      console.log(`api/god/uploadBackup ~> error :`, error);
      return NextResponse.json("Echec de récupération des data de la guilde", { status: 500 });
  }
};