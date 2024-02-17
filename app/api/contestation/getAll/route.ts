import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import ContestationModel from "@/tools/api/models/model.contestation";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const guildName = url.searchParams.get("guildName");
    console.log(`api/contestation/get ~> Tentative de récupération des contestations de la guilde ${guildName}`);
    // CONNEXION A LA DB
    await databaseConnecter();
    try {
        // AUTHENTIFICATION
        const memberMail = request.headers.get('X-user-Mail');
        const authHeader = request.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        const isAuthentified = memberMail && token ? await tokenChecker("admin", token, memberMail) : false;
        if (!isAuthentified) {
            console.log(`api/contestation/get ~> ${memberMail} a échoué son authentification`);
            return NextResponse.json("Non autorisé", { status: 401 });
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