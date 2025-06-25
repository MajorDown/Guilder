import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import authentifier from "@/tools/api/authentifier";
import AdminModel from "@/tools/api/models/model.admin";

export async function PUT(request: Request) {
    const req = await request.json();
    console.log(`api/authPersistence/update ~> Tentative de modification de l'authPersistence`);
    try {
        // CONNEXION A LA DB
        await databaseConnecter();
        // VERIFICATION DE LA PRESENCE DE DONNEES
        const adminMail = request.headers.get('X-Auth-Email');
        const token = request.headers.get('Authorization')?.split(' ')[1];
        if (!req) {
            console.log(`api/authPersistence/update ~> newAuthPersistence non défini`);
            return NextResponse.json("Veuillez renseigner le nouveau mode d'authentification", { status: 400 });
        }
        if (!adminMail) {
            console.log(`api/authPersistence/update ~> adminMail non défini`);
            return NextResponse.json("Veuillez renseigner l'adresse mail de l'admin", { status: 400 });
        }
        if (!token) {
            console.log(`api/authPersistence/update ~> token non défini`);
            return NextResponse.json("Veuillez renseigner le token de l'admin", { status: 400 });
        }
        // VERIFICATION DE L'AUTHENTIFICATION
        const authResponse = await authentifier({
            model: 'admin', 
            userMail: adminMail, 
            token: token}
        );
        if (!authResponse.authorized) {
            console.log(`api/authPersistence/update ~> ${authResponse.error}`);
            return NextResponse.json(authResponse.error, { status: 401 });
        }
        // RECHERCHE DE L'ADMIN A MODIFIER
        const adminToUpdate = await AdminModel.findOne({ mail: adminMail });
        // MODIFICATION DE L'ADMIN
        adminToUpdate.authPersistence = req.newAuthPersistence;
        adminToUpdate.save();
        console.log(`api/authPersistence/update ~> authPersistence modifié pour ${adminMail}`);
        return NextResponse.json(adminToUpdate, { status: 200 });
    }
    // GESTION DES ERREURS
    catch (error) {
        console.log("api/authPersistence/update ~> error :", error);
        return NextResponse.json("Échec de la modification de l'authPersistence", { status: 500 });
    }
}