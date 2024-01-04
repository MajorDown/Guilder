import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import OperationModel from "@/tools/api/models/model.operation";
import UserModel from "@/tools/api/models/model.user";

export async function DELETE(request: Request) {
    console.log("api/operation/delete ~> Tentative de suppression d'une opération");
    try {
        // Connexion à la base de données
        await databaseConnecter();
        // Récupération de la date de déclaration et du nom d'utilisateur depuis l'URL
        const url = new URL(request.url);
        const declarationDateParam = url.searchParams.get("date");
        const declarationDate = declarationDateParam ? new Date(declarationDateParam) : null;
        const userName = url.searchParams.get("user");
        if (!declarationDate || !userName) {
            return NextResponse.json("Paramètres manquants", { status: 400 });
        }
        // Vérification de l'authentification de l'utilisateur
        const userToCheck = await UserModel.findOne({name: userName});
        if (!userToCheck) {
          console.log(`api/operation/get ~> ${userName} n'existe pas dans la db`);
          return NextResponse.json("Non autorisé", { status: 401 });      
        }
        const authHeader = request.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        const isAuthentified = token ? await tokenChecker(token, userToCheck.mail) : false;
        if (!isAuthentified) {
          console.log(`api/operation/get ~> ${userName} a échoué son authentification`);
          return NextResponse.json("Non autorisé", { status: 401 });
        }
        // Récupération de l'opération
        const operation = await OperationModel.findOne({ declarationDate });
        if (!operation) {
            return NextResponse.json("Utilisateur ou opération non trouvée", { status: 404 });
        }
        // Vérification si l'utilisateur peut supprimer l'opération
        if (operation.worker !== userToCheck.name && operation.payer !== userToCheck.name) {
            return NextResponse.json("Action non autorisée", { status: 403 });
        }
        // Suppression de l'opération
        await OperationModel.deleteOne({ declarationDate });
        console.log(`api/operation/delete ~> Opération supprimée avec succès`);
        return NextResponse.json("Opération supprimée avec succès", { status: 200 });

    } catch (error) {
        console.error(`api/operation/delete ~> Erreur lors de la suppression : ${error}`);
        return NextResponse.json("Erreur interne du serveur", { status: 500 });
    }
}
