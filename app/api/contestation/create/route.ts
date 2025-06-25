import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import ContestationModel from "@/tools/api/models/model.contestation";
import authentifier from "@/tools/api/authentifier";

export async function POST(request: Request) {
    const contestation = await request.json();
    console.log(`api/contestation/create ~> Tentative de contestation de la part de ${contestation.contester}`);
    // CONNEXION A LA DB
    await databaseConnecter();
    // CREATION DE LA SESSION
    try {
        // VERIFICATION DE LA PRESENCE DE DONNEES
        const contesterMail = request.headers.get('X-user-Email');
        const token = request.headers.get('Authorization')?.split(' ')[1];
        if (!contestation || !contesterMail || !token) {
          console.log(`api/contestation/create ~> données manquantes`);
          return NextResponse.json("Données manquantes", { status: 400 });
        }
        // VERIFICATION DE L'AUTHENTIFICATION
        const authResponse = await authentifier({
            model: 'member', 
            userMail: contesterMail, 
            token: token}
        );
        if (!authResponse.authorized) {
            console.log(`api/contestation/create ~> ${authResponse.error}`);
            return NextResponse.json(authResponse.error, { status: 401 });
        }    
        // CREATION DE LA CONTESTATION
        const newContestation = new ContestationModel(contestation);
        await newContestation.save();
        // REPONSE
        console.log("api/contestation/create ~> nouvelle contestation créé :", newContestation);
        return NextResponse.json(newContestation, { status: 200 });
    }
    // GESTION DES ERREURS
    catch (error) {
        console.log("api/contestation/create ~> error :", error);
        return NextResponse.json("Échec de la modification du password", { status: 500 });
    }
}