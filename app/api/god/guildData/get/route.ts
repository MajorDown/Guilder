import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import AdminModel from "@/tools/api/models/model.admin";
import MemberModel from "@/tools/api/models/model.member";
import GuildConfigModel from "@/tools/api/models/model.guildConfig";
import InterventionModel from "@/tools/api/models/model.intervention";
import ContestationModel from "@/tools/api/models/model.contestation";
import { Admin, Member, Intervention, Contestation, GuildConfig } from "@/types";

export async function GET(request: Request) {
  console.log(`api/god/guildData/get ~> Requète de récupération des noms de chaque guilde`);
  try {
    // CONNEXION A LA DB
    await databaseConnecter();
    // AUTHENTIFICATION
    const IsGodConnected = request.headers.get('X-IsGodConnected') as String;
    if (!IsGodConnected  || IsGodConnected !== "true") {
      console.log(`api/god/guildData/get ~> God non connecté`);
      return NextResponse.json("Non autorisé", { status: 401 });
    }    
    // RECUPERATION DES DONNNES
    const guildName = request.headers.get('X-guildName') as String;
    // RECUPERATION DES ADMINS
    let adminsList: Admin[] = await AdminModel.find({guild: guildName});
    if (!adminsList) adminsList = [];
    adminsList.sort((a, b) => {return a.name.localeCompare(b.name)})
    // RECUPERATION DES MEMBRES
    let membersList: Member[] = await MemberModel.find({guild: guildName});
    if (!membersList) membersList = [];
    membersList.sort((a, b) => {return a.name.localeCompare(b.name)});
    // RECUPERATION DES CONFIGS
    let tools: GuildConfig["config"];
    let guildConfig: GuildConfig | null = await GuildConfigModel.findOne({name: guildName});
    if (guildConfig) tools = guildConfig.config;
    else tools = [];
    // RECUPERATION DES INTERVENTIONS EFFECTUES PAR CHAQUE MEMBRE
    let interventionsList: Intervention[] = [];
    for (let member of membersList) {
      let interventions = await InterventionModel.find({worker: member.name});
      if (interventions) interventionsList = [...interventionsList, ...interventions];
    }
    // TRIER LES INTERVENTIONS PAR DATE, PLUS EXACTEMENT PAR declarationDate qui est de type string
    interventionsList.sort((a, b) => {
      return b.declarationDate.localeCompare(a.declarationDate);      
    });
    // RECUPERATION DES CONTESTATIONS EFFECTUEES PAR CHAQUE MEMBRE
    let contestationsList: Contestation[] = [];
    for (let member of membersList) {
      let contestations = await ContestationModel.find({member: member.name});
      if (contestations) contestationsList = [...contestationsList, ...contestations];
    }
    const guildData = {
        admins: adminsList,
        members: membersList,
        tools: tools,
        interventions: interventionsList,
        contestations: contestationsList
    }
    return NextResponse.json(guildData, { status: 200 });
  }
  catch (error) {
    // SI ERREUR
      console.log(`api/god/guildsName/getAll ~> error :`, error);
      return NextResponse.json("Echec de chargement des membres de la guilde", { status: 500 });
  }
};