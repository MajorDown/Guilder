import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import MemberModel from "@/tools/api/models/model.member";
import { UserMail } from "@/types";

export async function GET(request: Request) {
    console.log(`api/member/getAll ~> Tentative de récupération des membres de la guilde`);
    try {
        // CONNEXION A LA DB
        await databaseConnecter();
        // AUTHENTIFICATION
        const adminMail = request.headers.get("X-admin-Mail") as UserMail;
        const authHeader = request.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        const isAuthentified = token ? await tokenChecker("admin", token, adminMail) : false;
        if (!isAuthentified) {
          console.log(`api/member/getAll ~> ${adminMail} a échoué son authentification`);
          return NextResponse.json("Non autorisé", { status: 401 });
        }
        // RÉCUPÉRATION DES MEMBRES
        const admin = await MemberModel.findOne({ mail: adminMail });
        if (!admin) {
            console.log(`api/member/getAll ~> ${adminMail} n'existe pas`);
            return NextResponse.json("Membre introuvable", { status: 404 });
        }
        const membersList = await MemberModel.find({ guild: admin.guild });
        console.log(`api/member/getAll ~> ${membersList.length} membres récupérés pour la guilde de ${adminMail}`);
        return NextResponse.json(membersList, { status: 200 });
    }
    // GESTION DES ERREURS
    catch (error) {
        console.log("api/member/delete ~> error :", error);
        return NextResponse.json("Échec de la modification du password", { status: 500 });
    }
}
