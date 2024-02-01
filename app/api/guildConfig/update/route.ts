import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import { passwordChecker, passwordCrypter } from "@/tools/api/passwordManager";
import AdminModel from "@/tools/api/models/model.admin";
import GuildConfigModel from "@/tools/api/models/model.guildConfig";

export async function PATCH(request: Request) {
    const newguildConfig = await request.json();
    console.log(`api/guildConfig/update ~> Tentative de modification de guildConfig`);
    try {
        // CONNEXION A LA DB
        await databaseConnecter();
        // VERIFICATION DE L'EXISTENCE DE LA GUILDE
        const guildConfigToUpdate = await GuildConfigModel.findOne({name: newguildConfig.name});
        if (!guildConfigToUpdate) {
            console.log(`api/guildConfig/update ~> la guilde ${newguildConfig.name} n'existe pas dans la db`);
            return NextResponse.json("Non autorisé", { status: 401 });      
        }
        // AUTHENTIFICATION
        const adminToCheck = await AdminModel.findOne({guild: newguildConfig.name});
        if (!adminToCheck) {
          console.log(`api/guildConfig/update ~> l'admin de la guilde ${newguildConfig.name} est introuvable dans la db`);
          return NextResponse.json("Non autorisé", { status: 401 });      
        }
        const authHeader = request.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        const isAuthentified = token ? await tokenChecker("admin", token, adminToCheck.mail) : false;
        if (!isAuthentified) {
          console.log(`api/guildConfig/update ~> ${adminToCheck.name} a échoué son authentification`);
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