import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import ContestationModel from "@/tools/api/models/model.contestation";

export async function POST(request: Request) {
    const contestation = await request.json();
    console.log(`api/contestation/create ~> Tentative de contestation de la part de ${contestation.contester}`);
    // CONNEXION A LA DB
    await databaseConnecter();
    // CREATION DE LA SESSION
    try {
        // AUTHENTIFICATION
        const contesterMail = request.headers.get('X-user-Email');
        const authHeader = request.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        const isAuthentified = contesterMail && token ? await tokenChecker("member", token, contesterMail) : false;
        if (!isAuthentified) {
          console.log(`api/contestation/create ~> ${contesterMail} a échoué son authentification`);
          return NextResponse.json("Non autorisé", { status: 401 });
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