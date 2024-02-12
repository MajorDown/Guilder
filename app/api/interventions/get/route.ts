import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import { MemberInterventions, UserMail, UserStatus } from "@/types";
import InterventionModel from "@/tools/api/models/model.intervention";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const userName = url.searchParams.get("user");
  console.log(`api/interventions/get ~> Requète de récupération des interventions concernant ${userName}`);
  try {
    await databaseConnecter();
    // AUTHENTIFICATION DE L'ADMIN
    const auth = request.headers.get('Authorization');
    const userToken = auth && auth.split(' ')[1];
    const userMail = request.headers.get('X-user-Mail') as UserMail;
    const role = request.headers.get('X-user-Role') as UserStatus;
    const isAuthentified = userToken ? await tokenChecker(role, userToken, userMail) : false;
    if (!isAuthentified) {
        console.log(`api/interventions/get ~> echec de l'authentification de l'utilisateur ${userMail}`);
        return NextResponse.json("Non autorisé", { status: 401 });
    }
    // RECUPERATION DES INTERVENTIONS
    let interventionsList : MemberInterventions = [];
    const interventionsAsWorker = await InterventionModel.find({worker: userName});
    console.log('en tant que worker :', interventionsAsWorker);
    const interventionsAsPayer = await InterventionModel.find({payer: userName}); 
    console.log('en tant que payer :', interventionsAsPayer);
    interventionsList =  [...interventionsAsWorker, ...interventionsAsPayer];
    console.log('total :', interventionsList);
    return NextResponse.json(interventionsList, { status: 200 });
  } catch (error) {
  // SI ERREUR
    console.log("api/interventions/get ~> error :", error);
    return NextResponse.json("Echec de chargement des membres de la guilde", { status: 500 });
  }
};