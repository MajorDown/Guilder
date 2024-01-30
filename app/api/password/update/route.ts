import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import { passwordChecker, passwordCrypter } from "@/tools/api/passwordManager";
import UserModel from "@/tools/api/models/model.user";
import AdminModel from "@/tools/api/models/model.admin";

export async function PATCH(request: Request) {
    const {role, who, lastPassword, newPassword } = await request.json();
    console.log(`api/pssword/update ~> Tentative de modification du password de ${who}`);
    try {
        // CONNEXION A LA DB
        await databaseConnecter();
        // CHOISIR ENTRE USER OU ADMIN
        let memberToUpdate;
        if (role === "user") {
            memberToUpdate = await UserModel.findOne({ name: who.name });
        }
        if (role === "admin") {
            memberToUpdate = await AdminModel.findOne({ name: who.name });
        }    
        // AUTHENTIFICATION
        const authHeader = request.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        const isAuthentified = token ? await tokenChecker(token, memberToUpdate.mail) : false;
        if (!isAuthentified) {
          console.log(`api/password/update ~> ${who} a échoué son authentification`);
          return NextResponse.json("Non autorisé", { status: 401 });
        }
        // VERIFICATION DE L'ANCIEN PASSWORD
        const isPasswordValid = await passwordChecker(lastPassword, memberToUpdate.password);
        if (!isPasswordValid) {
            console.log(`api/password/update ~> ${who} a échoué la vérification de son password`);
            return NextResponse.json("Échec de la modification du password", { status: 500 });
        }
        // MODIFICATION DU PASSWORD
        const hashedPassword = await passwordCrypter(newPassword);
        memberToUpdate.password = hashedPassword;
        memberToUpdate.save();
        return NextResponse.json("password mis à jour !", { status: 200 });
    }
    // GESTION DES ERREURS
    catch (error) {
        console.log("api/password/update ~> error :", error);
        return NextResponse.json("Échec de la modification du password", { status: 500 });
    }
}