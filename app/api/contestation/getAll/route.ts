import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import ContestationModel from "@/tools/api/models/model.contestation";
import authentifier from "@/tools/api/authentifier";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const guildName = url.searchParams.get("guildName");
    console.log(`api/contestation/get ~> Tentative de récupération des contestations de la guilde ${guildName}`);
    // CONNEXION A LA DB
    await databaseConnecter();
    try {
        // VERIFICATION DE LA PRESENCE DE DONNEES
        const memberMail = request.headers.get('X-user-Mail');
        const authHeader = request.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        if (!guildName || !memberMail || !token) {
            console.log(`api/contestation/get ~> données manquantes`);
            return NextResponse.json("Données manquantes", { status: 400 });
        }
        // VERIFICATION DE L'AUTHENTIFICATION
        const authResponse = await authentifier({
            model: 'member', 
            userMail: memberMail, 
            token: token,
            guildToCheck: guildName
        });
        if (!authResponse.authorized) {
            console.log(`api/contestation/get ~> ${authResponse.error}`);
            return NextResponse.json(authResponse.error, { status: 401 });
        }
        // RECUPERATION DES CONTESTATIONS
        const contestations = await ContestationModel.find({ guild: guildName });
        // FILTRER LES CONTESTATIONS PAR STATUS "EN ATTENTE"
        const waitingContestations = contestations.filter((contestation) => contestation.adminConclusion === "en attente");
        return NextResponse.json(waitingContestations, { status: 200 });
    }
    // GESTION DES ERREURS
    catch (error) {
        console.log("api/contestation/get ~> error :", error);
        return NextResponse.json("Échec de la modification du password", { status: 500 });
    }
}