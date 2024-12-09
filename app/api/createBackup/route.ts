import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import AdminModel from "@/tools/api/models/model.admin";
import MemberModel from "@/tools/api/models/model.member";
import GuildConfigModel from "@/tools/api/models/model.guildConfig";
import InterventionModel from "@/tools/api/models/model.intervention";
import ContestationModel from "@/tools/api/models/model.contestation";
import { Admin, Member, Intervention, Contestation, GuildConfig } from "@/types";

export async function GET(request: Request) {
  console.log(`api/god/createBackup ~> Requète de récupération des noms de chaque guilde`);
  try {
    // CONNEXION A LA DB
    await databaseConnecter();
    // AUTHENTIFICATION
    const IsGodConnected = request.headers.get('X-IsGodConnected') as String;
    if (!IsGodConnected  || IsGodConnected !== "true") {
      console.log(`api/god/createBackup ~> God non connecté`);
      return NextResponse.json("Non autorisé", { status: 401 });
    }    
    // RECUPERATION DE TOUT LES ADMIN
    let adminsList: Admin[] = await AdminModel.find({});
    if (!adminsList) adminsList = [];
    adminsList.sort((a, b) => {return a.name.localeCompare(b.name)});
    // RECUPERATION DE TOUT LES MEMBRES
    let membersList: Member[] = await MemberModel.find({});
    if (!membersList) membersList = [];
    membersList.sort((a, b) => {return a.name.localeCompare(b.name)});
    // RECUPERATION DE TOUT LES CONFIGS
    let guildsConfig: GuildConfig[] = await GuildConfigModel.find({});
    if (!guildsConfig) guildsConfig = [];
    // RECUPERATION DE TOUT LES INTERVENTIONS
    let interventionsList: Intervention[] = await InterventionModel.find({});
    if (!interventionsList) interventionsList = [];
    // RECUPERATION DE TOUTES LES CONTESTATIONS
    let contestationsList: Contestation[] = await ContestationModel.find({});
    if (!contestationsList) contestationsList = [];
    // RETOURNER TOUTES LES DONNEES
    const allData = {
        admins: adminsList,
        members: membersList,
        guildsConfig: guildsConfig,
        interventions: interventionsList,
        contestations: contestationsList
    }
    return NextResponse.json({ status: 201 });
  }
  catch (error) {
    // SI ERREUR
      console.log(`api/god/createBackup
         ~> error :`, error);
      return NextResponse.json("Echec de chargement des data de la guilde", { status: 500 });
  }
};