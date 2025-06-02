import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import { passwordChecker, passwordCrypter } from "@/tools/api/passwordManager";
import MemberModel from "@/tools/api/models/model.member";
import AdminModel from "@/tools/api/models/model.admin";

export async function PATCH(request: Request) {
    const {status, user, lastPassword, newPassword } = await request.json();
    console.log(`api/password/update ~> Tentative de modification du password du compte ${user.mail}`);
    try {
        // CONNEXION A LA DB
        await databaseConnecter();
        // CHOISIR ENTRE MEMBER OU ADMIN
        let userToUpdate;
        if (status === "admin") {
            userToUpdate = await AdminModel.findOne({ mail: user.mail });
        }
        if (status === "member") {
            userToUpdate = await MemberModel.findOne({ mail: user.mail });
        }
        // AUTHENTIFICATION
        const authHeader = request.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        console.log(`api/password/update ~> token :`, token);
        const isAuthentified = token ? await tokenChecker(status, token, userToUpdate.mail) : false;
        if (!isAuthentified) {
          console.log(`api/password/update ~> ${user.mail} a échoué son authentification`);
          return NextResponse.json("Non autorisé", { status: 401 });
        }
        // VERIFICATION DE L'ANCIEN PASSWORD
        const isPasswordValid = await passwordChecker(lastPassword, userToUpdate.password);
        if (!isPasswordValid) {
            console.log(`api/password/update ~> ${user.mail} a échoué la vérification de son ancien password`);
            return NextResponse.json("Échec de la modification du password", { status: 500 });
        }
        // MODIFICATION DU PASSWORD
        const hashedPassword = await passwordCrypter(newPassword);
        userToUpdate.password = hashedPassword;
        userToUpdate.save();
        console.log(`api/password/update ~> ${user.mail} a mis à jour son password`);
        return NextResponse.json("password mis à jour !", { status: 200 });
    }
    // GESTION DES ERREURS
    catch (error) {
        console.log("api/password/update ~> error :", error);
        return NextResponse.json("Échec de la modification du password", { status: 500 });
    }
}