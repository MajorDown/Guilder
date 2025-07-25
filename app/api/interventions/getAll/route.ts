import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import { UserMail } from "@/types";
import InterventionModel from "@/tools/api/models/model.intervention";
import MemberModel from "@/tools/api/models/model.member";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const userName = url.searchParams.get("user");
    console.log(`api/interventions/getAll ~> Requète de récupération des interventions de la guilde de ${userName}`);
    try {
        await databaseConnecter();
        // AUTHENTIFICATION DE L'ADMIN
        const auth = request.headers.get('Authorization');
        const adminToken = auth && auth.split(' ')[1];
        const userMail = request.headers.get('X-user-Mail') as UserMail;
        const isAuthentified = adminToken ? await tokenChecker('admin', adminToken, userMail) : false;
        if (!isAuthentified) {
            console.log(`api/interventions/getAll ~> echec de l'authentification de l'admin ${userMail}`);
            return NextResponse.json("Non autorisé", { status: 401 });
        }
        // récupération des membres de la guilde
        const membersList = await MemberModel.find({ guild: userMail });
        if (membersList.length === 0) {
            console.log(`api/interventions/getAll ~> Aucune intervention trouvée pour la guilde de ${userMail}`);
            return NextResponse.json([], { status: 200 }); // ou un message spécifique si besoin
        }
        const membersNames = membersList.map(member => member.name);

        // RECUPERATION DE TOUTES LES INTERVENTIONS DE chaque membre de la GUILDE
        const interventionsList = await InterventionModel.find({ worker: { $in: membersNames } }).sort({ interventionDate: 1 });

        return NextResponse.json({ interventions: interventionsList }, { status: 200 });

    } catch (error) {
    // SI ERREUR
        console.log("api/interventions/getAll ~> error :", error);
        return NextResponse.json({ error: "Échec de chargement des interventions", message: (error as Error).message }, { status: 500 });

    }
};