import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import ContestationModel from "@/tools/api/models/model.contestation";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const memberName = url.searchParams.get("member");
    console.log(`api/contestation/get ~> Tentative de récupréation des contestations concernant ${memberName}`);
    // CONNEXION A LA DB
    await databaseConnecter();
    try {
        // AUTHENTIFICATION
        const memberMail = request.headers.get('X-user-Email');
        const authHeader = request.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        const isAuthentified = memberMail && token ? await tokenChecker("member", token, memberMail) : false;
        if (!isAuthentified) {
          console.log(`api/contestation/get ~> ${memberMail} a échoué son authentification`);
          return NextResponse.json("Non autorisé", { status: 401 });
        }
        // RECUPERATION DES CONTESTATIONS
        const memberContestations = await ContestationModel.find({contester: memberName});
        const contestationsConcerningMember = await ContestationModel.find({"contestedIntervention.worker": memberName});
        const allContestations = [...memberContestations, ...contestationsConcerningMember];
        // REPONSE
        console.log("api/contestation/get ~> nouvelles contestations récupérées :", allContestations);
        return NextResponse.json(allContestations, { status: 200 });
    }
    // GESTION DES ERREURS
    catch (error) {
        console.log("api/contestation/get ~> error :", error);
        return NextResponse.json("Échec de la modification du password", { status: 500 });
    }
}