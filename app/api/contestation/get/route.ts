import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import ContestationModel from "@/tools/api/models/model.contestation";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const memberName = url.searchParams.get("member");
    console.log(`api/contestation/get ~> Tentative de récupération des contestations concernant ${memberName}`);
    // CONNEXION A LA DB
    await databaseConnecter();
    try {
        // AUTHENTIFICATION
        const memberMail = request.headers.get('X-user-Mail');
        const authHeader = request.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        const isAuthentified = memberMail && token ? await tokenChecker("member", token, memberMail) : false;
        if (!isAuthentified) {
            console.log(`api/contestation/get ~> ${memberMail} a échoué son authentification`);
            return NextResponse.json("Non autorisé", { status: 401 });
        }
        // RECUPERATION DES CONTESTATIONS
        // il faut récupérer les contestations ou le membre est le contester, mais aussi celle qu'il a déclaré lui-même, SANS FAIRE DE DOUBLONS (il peut être à la fois le contester et le déclarateur)
        const memberContestations = await ContestationModel.find({ contester: memberName });
        const contestationsIncludingMemberAsWorker = await ContestationModel.find({ "contestedIntervention.worker": memberName });
        const contestationsIncludingMemberAsPayer = await ContestationModel.find({ "contestedIntervention.payer": memberName });
        // Fusion des tableaux
        const allContestations = memberContestations
        .concat(contestationsIncludingMemberAsWorker)
        .concat(contestationsIncludingMemberAsPayer);
        // Élimination des doublons
        const uniqueContestations = allContestations.filter((contestation, index, array) => array.findIndex(c => c._id.toString() === contestation._id.toString()) === index);
        // Réponse avec les contestations uniques
        console.log("api/contestation/get ~> contestations uniques récupérées :", uniqueContestations);
        return NextResponse.json(uniqueContestations, { status: 200 });
    }
    // GESTION DES ERREURS
    catch (error) {
        console.log("api/contestation/get ~> error :", error);
        return NextResponse.json("Échec de la modification du password", { status: 500 });
    }
}