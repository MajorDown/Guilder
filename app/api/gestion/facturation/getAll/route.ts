import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import FactureModel from "@/tools/api/models/model.facture";

export async function GET(request: Request) {
  console.log(`api/god/facturation/getAll ~> Requète de récupération des factures`);
  try {
    // CONNEXION A LA DB
    await databaseConnecter();
    // AUTHENTIFICATION
    const IsGodConnected = request.headers.get('X-IsGodConnected') as String;
    if (!IsGodConnected  || IsGodConnected !== "true") {
      console.log(`api/god/facturation/getAll ~> God non connecté`);
      return NextResponse.json("Non autorisé", { status: 401 });
    }
    let facturationsList = await FactureModel.find();
    if (!facturationsList) facturationsList = [];
    return NextResponse.json(facturationsList, { status: 200 });
  }
  catch (error) {
    // SI ERREUR
      console.log(`api/god/facturation/getAll ~> error :`, error);
      return NextResponse.json("Echec de chargement des factures", { status: 500 });
  }
};