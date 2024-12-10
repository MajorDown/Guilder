import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import AdminModel from "@/tools/api/models/model.admin";
import MemberModel from "@/tools/api/models/model.member";
import GuildConfigModel from "@/tools/api/models/model.guildConfig";
import InterventionModel from "@/tools/api/models/model.intervention";
import ContestationModel from "@/tools/api/models/model.contestation";
import { Admin, Member, Intervention, Contestation, GuildConfig } from "@/types";
import clearAllCollections from "@/tools/api/mongooseRequests/clearAllCollections";

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
    // SAUVEGARDER LES NOUVELLES DONNES
    const newAdmins = await AdminModel.insertMany(data.admins);
    if (!newAdmins) throw new Error("Echec de restockage des admins");
    const newMembers = await MemberModel.insertMany(data.members);
    if (!newMembers) throw new Error("Echec de restockage des membres");
    const newGuildsConfig = await GuildConfigModel.insertMany(data.guildsConfig);
    if (!newGuildsConfig) throw new Error("Echec de restockage des configs");
    const newInterventions = await InterventionModel.insertMany(data.interventions);
    if (!newInterventions) throw new Error("Echec de restockage des interventions");
    const newContestations = await ContestationModel.insertMany(data.contestations);
    if (!newContestations) throw new Error("Echec de restockage des contestations");
    // RETOURNER UNE REPONSE SI TOUT EST OK
    return NextResponse.json({ status: 200 });
  }
  catch (error) {
    // SI ERREUR
      console.log(`api/god/uploadBackup ~> error :`, error);
      return NextResponse.json("Echec de récupération des data de la guilde", { status: 500 });
  }
};