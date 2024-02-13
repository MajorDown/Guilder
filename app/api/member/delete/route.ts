import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import MemberModel from "@/tools/api/models/model.member";
import { UserMail } from "@/types";

export async function DELETE(request: Request) {
    // Récupérer le mail du membre à supprimer mis dans l'url
    const memberToDeleteMail = request.headers.get("X-memberToDelete-Mail") as UserMail;
    console.log(`api/member/delete ~> Tentative de suppression du membre ${memberToDeleteMail}`);
    try {
        // CONNEXION A LA DB
        await databaseConnecter();
        // AUTHENTIFICATION
        const adminMail = request.headers.get("X-admin-Mail") as UserMail;
        const authHeader = request.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        const isAuthentified = token ? await tokenChecker("admin", token, adminMail) : false;
        if (!isAuthentified) {
          console.log(`api/member/delete ~> ${adminMail} a échoué son authentification`);
          return NextResponse.json("Non autorisé", { status: 401 });
        }
        // SUPPRESSION DU MEMBRE
        const memberToDelete = await MemberModel.findOneAndDelete({ mail: memberToDeleteMail });
        console.log(`api/member/delete ~> memberToDelete :`, memberToDelete);
        if (!memberToDelete) {
            console.log(`api/member/delete ~> ${memberToDeleteMail} n'existe pas`);
            return NextResponse.json("Membre introuvable", { status: 404 });
        }
        console.log(`api/member/delete ~> ${memberToDeleteMail} a été supprimé`);
        return NextResponse.json("Membre supprimé", { status: 200 });
    }
    // GESTION DES ERREURS
    catch (error) {
        console.log("api/member/delete ~> error :", error);
        return NextResponse.json("Échec de la modification du password", { status: 500 });
    }
}
